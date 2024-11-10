import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSessionStorage } from "@uidotdev/usehooks";
import { personalFormSchema, EmploymentStatuses } from '../../schemas/personalDetails';
import { Field, Select } from '../../components/Field'
import Button from '../../components/Button'

const EmploymentOptions: Record<EmploymentStatuses, string> = {
  [EmploymentStatuses.Employed]: "Employed",
  [EmploymentStatuses.Unemployed]: "Unemployed",
  [EmploymentStatuses.SelfEmployed]: "Self-Employed",
}

export default function PersonalDetails() {
  const navigate = useNavigate()
  const [customerStorageData, setCustomerStorageData] = useSessionStorage('customer-personal-data', { personalDetails: {} })
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