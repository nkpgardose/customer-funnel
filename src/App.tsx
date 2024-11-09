import styles from './App.module.css'
import { useForm } from "react-hook-form"

interface IPersonalDetailsInput {
  firstName: string,
  lastName: string,
  email: string,
  employmentStatus: string,
}

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPersonalDetailsInput>()

  function onSubmit(data: IPersonalDetailsInput) {
    console.log(data);
  }

  return (
    <main>
      <section>
        <h1 className={styles.App}>Fill in your details</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="first-name-field">First Name</label>
            <input type="text" id="first-name-field" {...register('firstName', { required: 'Please provide your first name.' })} />
            {errors.firstName && <span>{errors.firstName.message}</span>}
          </div>
          <div>
            <label htmlFor="last-name-field">Last Name</label>
            <input
              type="text"
              id="last-name-field"
              {...register('lastName', {
                required: "Please provide your last name",
                maxLength: {
                  value: 2,
                  message: "Min 2"
                }
              })}
            />
            {errors.lastName && <span>{errors.lastName.message}</span>}
          </div>
          <div>
            <label htmlFor="email-field">Email</label>
            <input type="email" id="email-field" {...register('email', { required: true  })} />
            {errors.email && <span>{errors.email.message}</span>}
          </div>
          <div>
            <label htmlFor="employment-status-select">Employment Status</label>
            <select id="employment-status-select" {...register('employmentStatus', { required: true })}>
              <option value="">Open to see selections</option>
              <option value="employed">Employed</option>
              <option value="selfEmployed">Self-Employed</option>
              <option value="unemployed">Unemployed</option>
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
