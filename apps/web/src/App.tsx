import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import POS from './pages/pos/POS'
import Login from './pages/auth/Login'
import Products from './pages/products/Products'
import Sales from './pages/sales/Sales'
import Purchases from './pages/purchases/Purchases'
import Inventory from './pages/inventory/Inventory'
import Warranty from './pages/warranty/Warranty'
import Settings from './pages/settings/Settings'
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
      { path: 'sales', element: <Sales /> },
      { path: 'purchases', element: <Purchases /> },
      { path: 'inventory', element: <Inventory /> },
      { path: 'warranty', element: <Warranty /> },
      { path: 'settings', element: <Settings /> },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App


function App() {
  return <RouterProvider router={router} />
}

export default App
