import styles from './Results.module.css'

export default function Results() {
	return (
		<div className={styles.Results}>
			<h1>List of recommended lenders</h1>
			<p>
				According to your respective details, these are the following recommended lenders:
			</p>
			<ul className={styles.list}>
				<li>
					<div className={styles.Card}>
						<h2>Lender A</h2>
						<div>
							<p><strong>Montly Repayment:</strong> $300</p>
							<p><strong>Interest Rate:</strong> 5.5% APR</p>
							<p><strong>Fees:</strong> $10 processing fee</p>
						</div>
					</div>
				</li>
				<li>
					<div className={styles.Card}>
						<h2>Lender B</h2>
						<div>
							<p><strong>Montly Repayment:</strong> $290</p>
							<p><strong>Interest Rate:</strong> 5.0% APR</p>
							<p><strong>Fees:</strong> $15 application fee</p>
						</div>
					</div>
				</li>
				<li>
					<div className={styles.Card}>
						<h2>Lender C</h2>
						<div>
							<p><strong>Montly Repayment:</strong> $310</p>
							<p><strong>Interest Rate:</strong> 6.0% APR</p>
							<p><strong>Fees:</strong> No fees</p>
						</div>
					</div>
				</li>
			</ul>
		</div>
	)
}