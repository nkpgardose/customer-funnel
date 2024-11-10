import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import { useNavigate } from 'react-router-dom'
import LoanDetails from './LoanDetails'

vi.mock('react-router-dom', () => ({
	useNavigate: vi.fn()
}))

describe('LoanDetails', () => {
	it('renders the page', () => {
		render(<LoanDetails />)
		expect(screen.getByRole('heading', { level: 1, name: "Fill in loan details" }))
		expect(screen.getByRole('spinbutton', { name: /Approximate vehicle price/i }))
		expect(screen.getByRole('spinbutton', { name: /Deposit amount/i }))
		expect(screen.getByRole('combobox', { name: /Loan Purpose/i }))
		expect(screen.getByRole('combobox', { name: /Loan Term/i }))
	})

	it('simulate error forms', async () => {
		const user = userEvent.setup()
		render(<LoanDetails />)
		await user.click(screen.getByRole('button', { name: 'Continue' }))
		expect(screen.getByText('Please select loan term.'))
	});
	
	it('simulate filling info', async () => {
		const navigate = vi.fn();
		vi.mocked(useNavigate).mockReturnValue(navigate);
		const user = userEvent.setup()
		render(<LoanDetails />)
		await user.type(screen.getByRole('spinbutton', { name: /Approximate vehicle price/i }), '20000')
		await user.type(screen.getByRole('spinbutton', { name: /Deposit/i }), '1000')
		await user.selectOptions(screen.getByRole('combobox', { name: /Purpose/i }), 'Vehicle')
		await user.selectOptions(screen.getByRole('combobox', { name: /Term/i }), '2 years')
		await user.click(screen.getByRole('button', { name: 'Continue' }))
		expect(navigate).toHaveBeenCalledWith();
	});
})