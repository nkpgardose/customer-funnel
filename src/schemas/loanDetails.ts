import { z } from 'zod';

const audCurrencyFormat = new Intl.NumberFormat('en-AU', {
	style: 'currency',
	currency: 'AUD',
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
});
export const MIN_LOAN_AMOUNT = 2_000;
export const MIN_VEHICLE_PRICE = 2_000;
export const MAX_VEHICLE_PRICE = 200_000;
export const MIN_DEPOSIT_PRICE = 0;
export const MAX_DEPOSIT_PRICE = 200_000;
export const MIN_LOAN_TERM = 1;
export const MAX_LOAN_TERM = 7;
export const FORMATTED_MIN_VEHICLE_PRICE =
	audCurrencyFormat.format(MIN_VEHICLE_PRICE);
export const FORMATTED_MIN_LOAN_AMOUNT =
	audCurrencyFormat.format(MIN_LOAN_AMOUNT);
export const DEFAULT_VEHICLE_PRICE_VALIDATION = `Please enter amount between $${MIN_VEHICLE_PRICE} and $${MAX_VEHICLE_PRICE}`;
export const DEFAULT_DEPOSIT_VALIDATION = `Deposit amount should be greater than $${MIN_DEPOSIT_PRICE}`;

export enum LoanPurposes {
	Vehicle = 'Vehicle',
	HomeImprovement = 'HomeImprovement',
}

export const loanFormSchema = z
	.object({
		vehiclePrice: z
			.number({ invalid_type_error: DEFAULT_VEHICLE_PRICE_VALIDATION })
			.min(MIN_VEHICLE_PRICE, { message: DEFAULT_VEHICLE_PRICE_VALIDATION })
			.max(MAX_VEHICLE_PRICE, { message: DEFAULT_VEHICLE_PRICE_VALIDATION }),
		deposit: z
			.number({ invalid_type_error: DEFAULT_DEPOSIT_VALIDATION })
			.min(MIN_DEPOSIT_PRICE, {
				message: DEFAULT_DEPOSIT_VALIDATION,
			})
			.min(MIN_DEPOSIT_PRICE, {
				message: `Deposit amount should be less than or equal to $${MAX_DEPOSIT_PRICE}`,
			}),
		loanPurpose: z.nativeEnum(LoanPurposes, {
			message: 'Please choose one of the options',
		}),
		loanTerm: z
			.number({ invalid_type_error: 'Please select loan term.' })
			.min(1, { message: 'Please select loan term.' })
			.max(7, { message: 'Please select loan term between 1 to 7 years.' }),
	})
	.superRefine((data, ctx) => {
		if (Math.max(0, data.vehiclePrice - data.deposit) < MIN_LOAN_AMOUNT) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: `
				The minimum loan amount that our lenders accept is ${FORMATTED_MIN_LOAN_AMOUNT}.
				Adjust your vehicle price or deposit to meet the minimum requirement.
			`,
				path: ['deposit'],
			});
		}
	});
