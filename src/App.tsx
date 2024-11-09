import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Field from './components/Field'
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
  employmentStatus: z.nativeEnum(EmploymentStatuses),
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
    <main>
      <section>
        <h1 className={styles.App}>Fill in your details</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Field
            fieldFor="first-name-field"
            labelText="First Name"
            registerResult={register('firstName')}
            errorMessage={errors.firstName?.message}
          />
          <Field
            fieldFor="last-name-field"
            labelText="Last Name"
            registerResult={register('lastName')}
            errorMessage={errors.lastName?.message}
          />
          <Field
            fieldFor="email-field"
            labelText="Email"
            inputAttributes={{
              type: 'email'
            }}
            registerResult={register('email')}
            errorMessage={errors.email?.message}
          />
          <div>
            <label htmlFor="employment-status-select">Employment Status</label>
            <select id="employment-status-select" {...register('employmentStatus')}>
              <option value="">Open to see selections</option>
              {Object.entries(EmploymentOptions).map(item => {
                return (
                  <option key={item[0]} value={item[0]}>{item[1]}</option>
                );
              })}
            </select>
            {errors.employmentStatus && <span>Please select your employment status.</span>}
          </div>
          <button type="submit">Continue</button>
        </form>
      </section>
    </main>
  )
}

export default App
