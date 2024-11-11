import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import nock from 'nock';
import { useNavigate } from 'react-router-dom';
import PersonalDetails from './PersonalDetails';

vi.mock('react-router-dom', () => ({
	useNavigate: vi.fn(),
}));

describe('PersonalDetails', () => {
	afterEach(nock.cleanAll);

	it('renders the page', () => {
		render(<PersonalDetails />);
		expect(
			screen.getByRole('heading', {
				level: 1,
				name: 'Fill in your personal details',
			}),
		);
		expect(screen.getByRole('textbox', { name: /First Name/i }));
		expect(screen.getByRole('textbox', { name: /Last Name/i }));
		expect(screen.getByRole('textbox', { name: /Email/i }));
		expect(screen.getByRole('combobox', { name: /Employment Status/i }));
	});

	it('simulates error forms', async () => {
		const user = userEvent.setup();
		render(<PersonalDetails />);
		await user.click(screen.getByRole('button', { name: 'Continue' }));
		expect(screen.getByText('Please provide your first name.'));
		expect(screen.getByText('Please provide your last name.'));
		expect(screen.getByText('Please provide your email address.'));
		expect(screen.getByText('Please choose one of the options'));
	});

	it('simulates filling info', async () => {
		global.fetch = vi.fn(() =>
			Promise.resolve({
				ok: true,
				status: 200,
				json: () =>
					Promise.resolve({
						id: 1,
						first_name: 'Neil',
						last_name: 'Gardose',
						email: 'sample@email.com',
						employmentStatus: 'Unemployed',
						employerName: '',
					}),
			} as Response),
		);

		const navigate = vi.fn();
		vi.mocked(useNavigate).mockReturnValue(navigate);
		const user = userEvent.setup();
		render(<PersonalDetails />);
		await user.type(
			screen.getByRole('textbox', { name: /First Name/i }),
			'Neil',
		);
		await user.type(
			screen.getByRole('textbox', { name: /Last Name/i }),
			'Gardose',
		);
		await user.type(
			screen.getByRole('textbox', { name: /Email/i }),
			'sample@email.com',
		);
		await user.selectOptions(
			screen.getByRole('combobox', { name: /Employment Status/i }),
			'Unemployed',
		);
		await user.click(screen.getByRole('button', { name: 'Continue' }));
		expect(navigate).toHaveBeenCalledWith('/loan-details');
	});
});
