import { ReactNode, InputHTMLAttributes } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

interface FieldProps {
	/**
	 * For label and input interaction(label's for & input's id)
	 * 
	 * See more: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label
	 */
	fieldFor: string,
	/**
	 * Label text to indicate input's information or responsibility.
	 */
	labelText?: ReactNode,
	/**
	 * Supporting `react-hook-form` register result.
	 * 
	 * ```jsx
	 * <Field
	 *   registerResult={register('firstName', { ... })}
	 *   ...
	 * />
	 * ```
	 */
	registerResult?: UseFormRegisterReturn,
	/**
	 * Input attributes i.e. disabled, aria-label, maxLengt, etc.
	 * It may overrides some Field's attributes default behaviour.
	 */
	inputAttributes?: InputHTMLAttributes<HTMLInputElement>
	/**
	 * Label attributes.
	 * It may overrides some Field's attributes default behaviour.
	 * Note: Make sure `labelText` is available.
	 */
	labelAttributes?: InputHTMLAttributes<HTMLLabelElement>
	errorMessage?: string
}

export default function Field({
	fieldFor,
	labelText,
	registerResult,
	labelAttributes,
	inputAttributes,
	errorMessage,
}: FieldProps) {
	return (
		<div>
			{labelText ? <label htmlFor={fieldFor} {...labelAttributes}>{labelText}</label> : null}
			<input id={fieldFor} {...registerResult} {...inputAttributes} />
			{errorMessage ? <p>{errorMessage}</p> : null}
		</div>
	)
}