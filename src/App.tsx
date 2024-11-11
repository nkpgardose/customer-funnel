import {
	createBrowserRouter,
	RouterProvider,
	Outlet,
	Link,
	useLocation,
} from 'react-router-dom';
import LoanDetails from './pages/LoanDetails';
import PersonalDetails from './pages/PersonalDetails';
import Results from './pages/Results';
import ErrorPage from './ErrorPage';
import styles from './App.module.css';

const initialPath = '/';
const router = createBrowserRouter([
	{
		path: initialPath,
		element: <Layout />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: initialPath,
				element: <PersonalDetails />,
			},
			{
				path: '/loan-details',
				element: <LoanDetails />,
			},
			{
				path: '/results',
				element: <Results />,
			},
		],
	},
]);

function Layout() {
	const location = useLocation();

	return (
		<main className={styles.App}>
			<section className={styles.section}>
				{location.pathname !== initialPath && (
					<Link className={styles.link} to={'..'}>
						&#9668; Back
					</Link>
				)}
				<Outlet />
			</section>
		</main>
	);
}

function App() {
	return <RouterProvider router={router} />;
}

export default App;
