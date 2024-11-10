import { describe, it, expect, vi } from 'vitest'
import { useForm } from 'react-hook-form'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import Field from './Field'

describe('Field', () => {
	it('renders the Field component', () => {
		render(
			<Field
				fieldFor="first-name-field"
				labelText="First Name"
			/>
		)

		expect(screen.getByLabelText('First Name')).toBeInTheDocument()
	})

	it('renders the Field error message', () => {
		render(
			<Field
				fieldFor="first-name-field"
				labelText="First Name"
				errorMessage="Something went wrong"
			/>
		)

		expect(screen.getByText('Something went wrong')).toBeInTheDocument()
	})

	it('simulates field submission', async () => {
		const onSubmit = vi.fn()
		const user = userEvent.setup()
		function TemplateForm() {
			const {
				register,
				handleSubmit,
				formState: { errors }
			} = useForm<{ firstName: string }>()

			return (
				<form onSubmit={handleSubmit(onSubmit)}>
					<Field
						fieldFor="first-name-field"
						labelText="First Name"
						registerResult={register('firstName', { required: 'Please provide your first name.' })}
            errorMessage={errors.firstName?.message}
					/>
					<button type="submit">Submit</button>
				</form>
			)
		}
		render(<TemplateForm />)

		await user.click(screen.getByRole('button', { name: 'Submit' }))
		expect(screen.getByText('Please provide your first name.')).toBeInTheDocument()

		await user.type(
			screen.getByRole('textbox', { name: 'First Name' }),
			"SampleName"
		)
		await user.click(screen.getByRole('button', { name: 'Submit' }))

		expect(onSubmit.mock.calls[0][0]).toEqual({
			firstName: "SampleName"
		})
	})
})