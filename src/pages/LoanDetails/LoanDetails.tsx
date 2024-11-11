import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSessionStorage } from '@uidotdev/usehooks';
import {
	LoanPurposes,
	loanFormSchema,
	FORMATTED_MIN_VEHICLE_PRICE,
	MAX_DEPOSIT_PRICE,
	MAX_LOAN_TERM,
	MAX_VEHICLE_PRICE,
	MIN_DEPOSIT_PRICE,
	MIN_LOAN_TERM,
	MIN_VEHICLE_PRICE,
} from '../../schemas/loanDetails';
import { Field, Select } from '../../components/Field';
import Button from '../../components/Button';

const LoanPurposesOptions: Record<LoanPurposes, string> = {
	[LoanPurposes.Vehicle]: 'Vehicle',
	[LoanPurposes.HomeImprovement]: 'Home Improvement',
};

export default function LoanDetails() {
	const [fetchStatus, setFetchStatus] = useState<
		'loading' | 'error' | 'default'
	>('default');
	const [customerStorageData, setCustomerStorageData] = useSessionStorage(
		'customer-personal-data',
		{
			personalDetails: { id: null },
			loanDetails: {},
		},
	);
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<z.infer<typeof loanFormSchema>>({
		resolver: zodResolver(loanFormSchema),
		defaultValues: {
			vehiclePrice: MIN_VEHICLE_PRICE,
			deposit: MIN_DEPOSIT_PRICE,
			...customerStorageData.loanDetails,
		},
	});

	function onSubmit(data: z.infer<typeof loanFormSchema>) {
		if (fetchStatus === 'loading') {
			return;
		}

		const {
			vehiclePrice: price,
			deposit,
			loanPurpose: loan_purpose,
			loanTerm: loan_term,
		} = data;

		setFetchStatus('loading');
		fetch(`${import.meta.env.VITE_API_BASE_URL}/loan-details`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				customer_id: customerStorageData.personalDetails.id,
				price,
				deposit,
				loan_purpose,
				loan_term,
			}),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}

				return response.json();
			})
			.then(({ id, customer_id, price, deposit, loan_purpose, loan_term }) => {
				setFetchStatus('default');
				setCustomerStorageData({
					...customerStorageData,
					loanDetails: {
						id,
						customer_id,
						price,
						deposit,
						loan_purpose,
						loan_term,
					},
				});
				navigate('/results');
			})
			.catch((err) => {
				setFetchStatus('error');
				console.error(err);
			});
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
					placeholder: '$0',
					type: 'number',
					min: MIN_DEPOSIT_PRICE,
					max: MAX_DEPOSIT_PRICE,
				}}
			/>
			<Select
				selectFor="loan-purpose-select"
				labelText="Loan Purpose"
				isLabelRequired
				registerResult={register('loanPurpose')}
				errorMessage={errors.loanPurpose?.message}
			>
				<option value="">Open to see selections</option>
				{Object.entries(LoanPurposesOptions).map((item) => {
					return (
						<option key={item[0]} value={item[0]}>
							{item[1]}
						</option>
					);
				})}
			</Select>
			<Select
				selectFor="loan-term-select"
				labelText="Loan Term"
				isLabelRequired
				registerResult={register('loanTerm', { valueAsNumber: true })}
				errorMessage={errors.loanTerm?.message}
			>
				<option value="">Open to see selections</option>
				{Array(MAX_LOAN_TERM + 1)
					.fill(MIN_LOAN_TERM, MIN_LOAN_TERM)
					.map((_el, index) => (
						<option key={index} value={index}>
							{index} years
						</option>
					))}
			</Select>
			<br />
			<Button variant="primary" type="submit">
				{fetchStatus !== 'loading' ? (
					'Continue'
				) : (
					<span>Processing&hellip;</span>
				)}
			</Button>
			{fetchStatus === 'error' && (
				<p>
					<em>Something went wrong. Try again in a few minutes</em>
				</p>
			)}
		</form>
	);
}
