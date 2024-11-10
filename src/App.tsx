import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Field, Select } from './components/Field'
import Button from './components/Button'
import styles from './App.module.css'

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
});

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof personalFormSchema>>({
    resolver: zodResolver(personalFormSchema)
  })

  function onSubmit(data: z.infer<typeof personalFormSchema>) {
    console.log(data);
  }

  return (
    <main className={styles.App}>
      <section>
        <form className={styles.Form} onSubmit={handleSubmit(onSubmit)}>
          <h1>Fill in your personal details</h1>
          <Field
            fieldFor="first-name-field"
            labelText="First Name"
            isLabelRequired={!(personalFormSchema.shape.firstName instanceof z.ZodOptional)}
            registerResult={register('firstName')}
            errorMessage={errors.firstName?.message}
          />
          <Field
            fieldFor="last-name-field"
            labelText="Last Name"
            isLabelRequired={!(personalFormSchema.shape.lastName instanceof z.ZodOptional)}
            registerResult={register('lastName')}
            errorMessage={errors.lastName?.message}
          />
          <Field
            fieldFor="email-field"
            labelText="Email"
            isLabelRequired={!(personalFormSchema.shape.email instanceof z.ZodOptional)}
            inputAttributes={{
              type: 'email'
            }}
            registerResult={register('email')}
            errorMessage={errors.email?.message}
          />
          <Select
            selectFor='employment-status-select'
            labelText="Employment Status"
            isLabelRequired={!(personalFormSchema.shape.employmentStatus instanceof z.ZodOptional)}
            registerResult={register('employmentStatus')}
            errorMessage={errors.employmentStatus?.message}
          >
              <option value="">Open to see selections</option>
              {Object.entries(EmploymentOptions).map(item => {
                return (
                  <option key={item[0]} value={item[0]}>{item[1]}</option>
                );
              })}
          </Select>
          <div className={styles.actions}>
            <Button variant="primary" type="submit">Continue</Button>
          </div>
        </form>
      </section>
    </main>
  )
}

export default App
