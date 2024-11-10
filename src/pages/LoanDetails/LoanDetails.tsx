import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSessionStorage } from "@uidotdev/usehooks";
import { LoanPurposes, loanFormSchema, 
	FORMATTED_MIN_VEHICLE_PRICE,
	MAX_DEPOSIT_PRICE,
	MAX_LOAN_TERM,
	MAX_VEHICLE_PRICE,
	MIN_DEPOSIT_PRICE,
	MIN_LOAN_TERM,
	MIN_VEHICLE_PRICE,
} from '../../schemas/loanDetails';
import { Field, Select } from '../../components/Field'
import Button from '../../components/Button'

const LoanPurposesOptions: Record<LoanPurposes, string> = {
	[LoanPurposes.Vehicle]: "Vehicle",
	[LoanPurposes.HomeImprovement]: "Home Improvement",
}


export default function LoanDetails() {
	const navigate = useNavigate()
  const [customerStorageData, setCustomerStorageData] = useSessionStorage('customer-personal-data', {
		loanDetails: {}
	})
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<z.infer<typeof loanFormSchema>>({
		resolver: zodResolver(loanFormSchema),
		defaultValues: {
			vehiclePrice: MIN_VEHICLE_PRICE,
			deposit: MIN_DEPOSIT_PRICE,
			...customerStorageData.loanDetails
		}
	})

	function onSubmit(data: z.infer<typeof loanFormSchema>) {
		setCustomerStorageData({
			...customerStorageData,
			loanDetails: data
		})
		navigate('/results')
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<h1>Fill in loan details</h1>
			<Field
				fieldFor="vechicle-price-field"
				labelText="Approximate vehicle price"
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
			<Button variant="primary" type="submit">Continue</Button>
		</form>
	)
}