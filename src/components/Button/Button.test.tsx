import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from './Button'

describe('<Button />', () => {
	it('renders a button with the given text', () => {
		render(<Button>Click me</Button>)
		expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
	})

	it('simulates click event', async () => {
		const user = userEvent.setup()
		const onClick = vi.fn()
		render(<Button onClick={onClick}>Create</Button>)
		await user.click(screen.getByRole('button', { name: 'Create' }))
		expect(onClick).toHaveBeenCalled()
	})
});