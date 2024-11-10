import { ButtonHTMLAttributes } from 'react'
import styles from './Button.module.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'primary' | 'secondary' | ''
}

export default function Button({
	variant = '',
	children,
	...props
}: ButtonProps) {
	let buttonClasses = styles.Button

	if(variant) {
		buttonClasses += ` ${styles[variant]}`
	}

	return (
		<button type="button" className={buttonClasses} {...props}>
			{children}
		</button>
	)
}