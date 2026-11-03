import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import POS from './pages/pos/POS'
import Login from './pages/auth/Login'
import Products from './pages/products/Products'
import Layout from './components/Layout'

const router = createBrowserRouter([
  { path: '/login', element: <Login /> },
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <POS /> },
      { path: 'pos', element: <POS /> },
      { path: 'products', element: <Products /> },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
