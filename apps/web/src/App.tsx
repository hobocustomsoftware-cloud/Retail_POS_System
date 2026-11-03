import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import POS from './pages/pos/POS'
import Login from './pages/auth/Login'
import Products from './pages/products/Products'
import Sales from './pages/sales/Sales'
import Purchases from './pages/purchases/Purchases'
import Inventory from './pages/inventory/Inventory'
import Warranty from './pages/warranty/Warranty'
import Settings from './pages/settings/Settings'
import Customers from './pages/customers/Customers'
import Suppliers from './pages/suppliers/Suppliers'
import Categories from './pages/categories/Categories'
import Brands from './pages/brands/Brands'
import Units from './pages/units/Units'
import Branches from './pages/branches/Branches'
import Users from './pages/users/Users'
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
      { path: 'customers', element: <Customers /> },
      { path: 'suppliers', element: <Suppliers /> },
      { path: 'categories', element: <Categories /> },
      { path: 'brands', element: <Brands /> },
      { path: 'units', element: <Units /> },
      { path: 'branches', element: <Branches /> },
      { path: 'users', element: <Users /> },
      { path: 'settings', element: <Settings /> },
      { path: 'verification', element: <Verification /> },
      { path: 'legal/terms', element: <Terms /> },
      { path: 'legal/privacy', element: <Privacy /> },
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


function App() {
  return <RouterProvider router={router} />
}

export default App
import Terms from './pages/legal/Terms'
import Privacy from './pages/legal/Privacy'
import Verification from './pages/sales/Verification'
