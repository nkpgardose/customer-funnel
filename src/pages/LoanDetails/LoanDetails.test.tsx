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

	it('simulates error forms', async () => {
		const user = userEvent.setup()
		render(<LoanDetails />)
		await user.click(screen.getByRole('button', { name: 'Continue' }))
		expect(screen.getByText('Please select loan term.'))
	})
	
	it('simulates filling info', async () => {
		global.fetch = vi.fn(() =>
			Promise.resolve({
				ok: true,
				status: 200,
				json: () => Promise.resolve({
					some: "payload"
				}),
			} as Response),
		);
		const navigate = vi.fn()
		vi.mocked(useNavigate).mockReturnValue(navigate)
		const user = userEvent.setup()
		render(<LoanDetails />)

		await user.selectOptions(screen.getByRole('combobox', { name: /Loan Purpose/i }), 'Vehicle')
		await user.selectOptions(screen.getByRole('combobox', { name: /Loan Term/i }), '2 years')
		await user.click(screen.getByRole('button', { name: 'Continue' }))
		expect(navigate).toHaveBeenCalledWith('/results')
	})
})