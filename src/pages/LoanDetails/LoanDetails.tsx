import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Field, Select } from '../../components/Field'
import Button from '../../components/Button'
import styles from '../../App.module.css'

enum LoanPurposes {
	Vehicle = 'Vehicle',
	HomeImprovement = "HomeImprovement",
}

const LoanPurposesOptions: Record<LoanPurposes, string> = {
	[LoanPurposes.Vehicle]: "Vehicle",
	[LoanPurposes.HomeImprovement]: "Home Improvement",
}

const audCurrencyFormat = new Intl.NumberFormat('en-AU', {
	style: 'currency',
	currency: 'AUD',
	minimumFractionDigits: 2,
	maximumFractionDigits: 2
})
const MIN_LOAN_AMOUNT = 2_000
const MIN_VEHICLE_PRICE = 2_000
const MAX_VEHICLE_PRICE = 200_000
const MIN_DEPOSIT_PRICE = 0;
const MAX_DEPOSIT_PRICE = 200_000
const MIN_LOAN_TERM = 1
const MAX_LOAN_TERM = 7
const DEFAULT_VEHICLE_PRICE_VALIDATION = `Please enter amount between $${MIN_VEHICLE_PRICE} and $${MAX_VEHICLE_PRICE}`
const DEFAULT_DEPOSIT_VALIDATION = `Deposit amount should be greater than $${MIN_DEPOSIT_PRICE}`
const FORMATTED_MIN_VEHICLE_PRICE = audCurrencyFormat.format(MIN_VEHICLE_PRICE)
const FORMATTED_MIN_LOAN_AMOUNT = audCurrencyFormat.format(MIN_LOAN_AMOUNT)
const loanFormSchema = z.object({
	vehiclePrice: z
		.number({ invalid_type_error: DEFAULT_VEHICLE_PRICE_VALIDATION })
		.min(MIN_VEHICLE_PRICE, { message: DEFAULT_VEHICLE_PRICE_VALIDATION })
		.max(MAX_VEHICLE_PRICE, { message: DEFAULT_VEHICLE_PRICE_VALIDATION }),
	deposit: z
		.number({ invalid_type_error: DEFAULT_DEPOSIT_VALIDATION })
		.min(MIN_DEPOSIT_PRICE, {
			message: DEFAULT_DEPOSIT_VALIDATION
		})
		.min(MIN_DEPOSIT_PRICE, {
			message: `Deposit amount should be less than or equal to $${MAX_DEPOSIT_PRICE}`
		}),
	loanPurpose: z.nativeEnum(LoanPurposes, {
		message: "Please choose one of the options"
	}),
	loanTerm: z
		.number({ invalid_type_error: 'Please select loan term.' })
		.min(1, { message: 'Please select loan term.' })
		.max(7, { message: 'Please select loan term between 1 to 7 years.' })
}).superRefine((data, ctx) => {
	if(Math.max(0, data.vehiclePrice - data.deposit) < MIN_LOAN_AMOUNT) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: `
				The minimum loan amount that our lenders accept is ${FORMATTED_MIN_LOAN_AMOUNT}.
				Adjust your vehicle price or deposit to meet the minimum requirement.
			`,
			path: ['loanTerm']
		})
	}
})

export default function LoanDetails() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof loanFormSchema>>({
    resolver: zodResolver(loanFormSchema),
		defaultValues: {
			vehiclePrice: MIN_VEHICLE_PRICE,
			deposit: MIN_DEPOSIT_PRICE,
		}
  })

  function onSubmit(data: z.infer<typeof loanFormSchema>) {
    console.log(data)
  }

	return (
    <main className={styles.App}>
      <section>
        <form className={styles.Form} onSubmit={handleSubmit(onSubmit)}>
          <h1>Fill in loan details</h1>
					<Field
						fieldFor="vechicle-price-field"
						labelText="Approximate vechicle price"
						isLabelRequired
						registerResult={register('vehiclePrice', { valueAsNumber: true })}
						errorMessage={errors.vehiclePrice?.message}
						inputAttributes={{
							inputMode: 'decimal',
							placeholder: FORMATTED_MIN_VEHICLE_PRICE,
							type: 'number',
							min: MIN_VEHICLE_PRICE,
							max: MAX_VEHICLE_PRICE,
							step: 100,
						}}
					/>
					<Field
						fieldFor="deposit-field"
						labelText="Deposit amount"
						isLabelRequired
						registerResult={register('deposit', { valueAsNumber: true })}
						errorMessage={errors.deposit?.message}
						inputAttributes={{
							inputMode: 'decimal',
							placeholder: "$0",
							type: 'number',
							min: MIN_DEPOSIT_PRICE,
							max: MAX_DEPOSIT_PRICE,
							step: 100,
						}}
					/>
					<Select
						selectFor='loan-purpose-select'
						labelText="Loan Purpose"
						isLabelRequired
						registerResult={register('loanPurpose')}
						errorMessage={errors.loanPurpose?.message}
					>
            <option value="">Open to see selections</option>
						{Object.entries(LoanPurposesOptions).map(item => {
							return (
								<option key={item[0]} value={item[0]}>{item[1]}</option>
							)
						})}
          </Select>
					<Select
						selectFor='loan-term-select'
						labelText="Loan Term"
						isLabelRequired
						registerResult={register('loanTerm', { valueAsNumber: true })}
						errorMessage={errors.loanTerm?.message}
					>
            <option value="">Open to see selections</option>
						{Array(MAX_LOAN_TERM + 1).fill(MIN_LOAN_TERM, MIN_LOAN_TERM).map((_el, index) => (
							<option
								key={index}
								value={index}
							>
								{index} years
							</option>
						))}
          </Select>
          <div className={styles.actions}>
            <Button variant="primary" type="submit">Continue</Button>
          </div>
        </form>
      </section>
    </main>
	)
}