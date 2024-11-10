import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom"
import LoanDetails from "./pages/LoanDetails"
import PersonalDetails from "./pages/PersonalDetails"
import ErrorPage from "./ErrorPage";
import styles from './App.module.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <PersonalDetails />,
      },
      {
        path: "/loan-details",
        element: <LoanDetails />
      },
      {
        path: "/results",
        element: <div>Results Page!</div>
      }

    ]
  },
]);

function Layout() {
  return (
    <main className={styles.App}>
      <section className={styles.section}>
        <Outlet />
      </section>
    </main>
  )
}


function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
