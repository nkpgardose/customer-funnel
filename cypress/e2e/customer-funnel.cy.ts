describe('Customer funnel flow', () => {
	describe('User sees initial page', () => {
		it('navigates at the root page', () => {
			cy.visit('/')
			cy.title().should('eq', 'Get Started | Loan Recommendations')
		})
	})

	describe('User fills out personal details', () => {
		it('navigates and fills out personal detail form', () => {
			cy.visit('/')
			cy.findByRole('heading', {
				level: 1, name: "Fill in your personal details"
			}).should('exist')
			cy.findByRole('textbox', { name: /First Name/i }).type('Neil')
			cy.findByRole('textbox', { name: /Last Name/i }).type('Neil')
			cy.findByRole('textbox', { name: /Email/i }).type('sample@email.com')
			cy.findByRole('combobox', { name: /Employment Status/i }).select('Unemployed')
			cy.findByRole('button', { name: /Continue/i }).click()
			cy.findByRole('heading', {
				level: 1, name: "Fill in loan details"
			}).should('exist')
		})
	})

	describe('User fills out personal details and loan details', () => {
		it('navigates and fills out personal detail form', () => {
			cy.visit('/')
			cy.findByRole('heading', {
				level: 1, name: "Fill in your personal details"
			}).should('exist')
			cy.findByRole('textbox', { name: /First Name/i }).type('Neil')
			cy.findByRole('textbox', { name: /Last Name/i }).type('Neil')
			cy.findByRole('textbox', { name: /Email/i }).type('sample@email.com')
			cy.findByRole('combobox', { name: /Employment Status/i }).select('Unemployed')
			cy.findByRole('button', { name: /Continue/i }).click()
			cy.findByRole('heading', {
				level: 1, name: "Fill in loan details"
			}).should('exist')
			cy.findByRole('spinbutton', { name: /Approximate vehicle price/i }).clear().type('20000')
			cy.findByRole('spinbutton', { name: /Deposit amount/i }).clear().type('2500')
			cy.findByRole('combobox', { name: /Loan Purpose/i }).select('Vehicle')
			cy.findByRole('combobox', { name: /Loan Term/i }).select('2 years')
			cy.findByRole('button', { name: /Continue/i }).click()
			cy.findByRole('heading', {
				level: 1, name: "List of recommended lenders"
			}).should('exist')
		})
	})
})
