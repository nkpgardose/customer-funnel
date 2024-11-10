import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSessionStorage } from "@uidotdev/usehooks";
import { Field, Select } from '../../components/Field'
import Button from '../../components/Button'

enum EmploymentStatuses {
  Employed = "Employed",
  Unemployed = "Unemployed",
  SelfEmployed = 'SelfEmployed',
}

const EmploymentOptions: Record<EmploymentStatuses, string> = {
  [EmploymentStatuses.Employed]: "Employed",
  [EmploymentStatuses.Unemployed]: "Unemployed",
  [EmploymentStatuses.SelfEmployed]: "Self-Employed",
}

const personalFormSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'Please provide your first name.' }),
  lastName: z
    .string()
    .min(1, { message: 'Please provide your last name.' }),
  email: z
    .string()
    .min(1, { message: 'Please provide your email address.' })
    .email({ message: 'Please enter a valid email address.' }),
  employmentStatus: z.nativeEnum(EmploymentStatuses, {
    message: 'Please choose one of the options'
  }),
  employerName: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.employmentStatus === EmploymentStatuses.Employed) {
    if (data.employerName === undefined || data.employerName === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please provide your current employer name.',
        path: ['employerName']
      })
    }
  }
})

export default function PersonalDetails() {
  const navigate = useNavigate()
  const [customerStorageData, setCustomerStorageData] = useSessionStorage('customer-personal-data', { personalDetails: {} });
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof personalFormSchema>>({
    resolver: zodResolver(personalFormSchema),
    defaultValues: customerStorageData.personalDetails
  })
  const watchEmploymentStatus = watch('employmentStatus')

  function onSubmit(data: z.infer<typeof personalFormSchema>) {
    setCustomerStorageData({
      ...customerStorageData,
      personalDetails: data
    })
    navigate('/loan-details')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Fill in your personal details</h1>
      <Field
        fieldFor="first-name-field"
        labelText="First Name"
        isLabelRequired
        registerResult={register('firstName')}
        errorMessage={errors.firstName?.message}
      />
      <Field
        fieldFor="last-name-field"
        labelText="Last Name"
        isLabelRequired
        registerResult={register('lastName')}
        errorMessage={errors.lastName?.message}
      />
      <Field
        fieldFor="email-field"
        labelText="Email"
        isLabelRequired
        inputAttributes={{
          type: 'email'
        }}
        registerResult={register('email')}
        errorMessage={errors.email?.message}
      />
      <Select
        selectFor='employment-status-select'
        labelText="Employment Status"
        isLabelRequired
        registerResult={register('employmentStatus')}
        errorMessage={errors.employmentStatus?.message}
      >
        <option value="">Open to see selections</option>
        {Object.entries(EmploymentOptions).map(item => {
          return (
            <option key={item[0]} value={item[0]}>{item[1]}</option>
          )
        })}
      </Select>
      {watchEmploymentStatus === EmploymentStatuses.Employed ? (
        <Field
          fieldFor="employer-name-field"
          labelText="Employer Name"
          isLabelRequired
          registerResult={register('employerName')}
          errorMessage={errors.employerName?.message}
        />
      ) : null}
      <Button variant="primary" type="submit">Continue</Button>
    </form>
  )
}