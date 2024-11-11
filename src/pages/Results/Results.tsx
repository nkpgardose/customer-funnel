import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSessionStorage } from "@uidotdev/usehooks";
import styles from './Results.module.css'

interface Fee {
	id: number
	amount: number
	type: string
}

interface RecommendedResult {
	id: number
	name: string
	repayment: string
	interestRate: string
	fees: Fee[]
}

export default function Results() {
	const navigate = useNavigate()
	const [recomResults, setRecomResults] = useState<RecommendedResult[] | null>(null);
	const [fetchStatus, setFetchStatus] = useState<'loading' | 'error' | 'default'>('default');
	const [customerStorageData] = useSessionStorage('customer-personal-data', {
		personalDetails: { id: null },
		loanDetails: { id: null }
	})

	useEffect(() => {
		if (
			!customerStorageData.loanDetails.id ||
			!customerStorageData.personalDetails.id
		) {
			navigate('/')
		}
	}, [
		customerStorageData.loanDetails.id,
		customerStorageData.personalDetails.id,
		navigate
	])

	useEffect(() => {
		setFetchStatus('loading')
		fetch(`${import.meta.env.VITE_API_BASE_URL}/lenders-recommendations`)
			.then((response) => {
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`)
				}

				return response.json()
			})
			.then(payload => {
				setFetchStatus('default')
				setRecomResults(payload)
			})
			.catch(error => {
				setFetchStatus('error')
				console.error(error)
			})
	}, [])

	return (
		<div className={styles.Results}>
			<h1>List of recommended lenders</h1>
			<p>
				According to your respective details, these are the following
				recommended lenders:
			</p>
			{fetchStatus === 'loading' && <p>Formulating lender recommendations...</p>}
			{fetchStatus === 'error' && <p>There was an error fetching the recommendations. Please try again later.</p>}
			<ul className={styles.list}>
				{recomResults ? (recomResults.map(item => {
					return (
						<li key={item.id}>
							<div className={styles.Card}>
								<h2>{item.name}</h2>
								<div>
									<p><strong>Repayment:</strong> {item.repayment}</p>
									<p><strong>Interest Rate:</strong> {item.interestRate}</p>
									{item.fees.map(fee => (
										<p key={fee.id}><strong>Fees:</strong> ${fee.amount} {fee.type} fee</p>
									))}
								</div>
							</div>
						</li>
					)
				})) : (
					<li>
						Hold tight! We're crunching the numbers to find the best lenders for
						you&hellip;
					</li>
				)}
			</ul>
		</div>
	)
}
