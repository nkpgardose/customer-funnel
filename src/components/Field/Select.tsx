import { InputHTMLAttributes, ReactNode } from "react"
import { UseFormRegisterReturn } from "react-hook-form"
import styles from './Field.module.css'

interface SelectProps {
	selectFor: string
	labelText: ReactNode
	isLabelRequired?: boolean,
	registerResult?: UseFormRegisterReturn
	selectAttributes?: InputHTMLAttributes<HTMLSelectElement>
	labelAttributes?: InputHTMLAttributes<HTMLLabelElement>
	errorMessage?: string
	children: ReactNode
}

export default function Select({
	selectFor,
	labelText,
	isLabelRequired = false,
	registerResult,
	labelAttributes,
	selectAttributes,
	errorMessage,
	children
}: SelectProps) {
	return (
		<div className={styles.Field}>
			{
				labelText ?
					<label
						className={styles.label}
						htmlFor={selectFor}
						{...labelAttributes}
					>
						{labelText}
						{isLabelRequired ? <span className={styles.labelRequired}>*</span> : null}
					</label>
					: null
			}
			<select
				className={errorMessage ? styles.inputWithError : styles.input}
				id={selectFor}
				{...registerResult}
				{...selectAttributes}
			>
				{children}
			</select>
			{errorMessage ? <p className={styles.error}>{errorMessage}</p> : null}
		</div>
	)
}