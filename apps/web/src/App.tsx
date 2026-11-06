import { useEffect } from 'react'
import { createHashRouter, RouterProvider, useNavigate } from 'react-router-dom'
import api from './api/axios'
import Backup from './pages/settings/Backup'
import POS from './pages/pos/POS'
import Dashboard from './pages/dashboard/Dashboard'
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
import Terms from './pages/legal/Terms'
import Privacy from './pages/legal/Privacy'
import Verification from './pages/sales/Verification'
import Pricing from './pages/billing/Pricing'
import Pay from './pages/billing/Pay'
import History from './pages/billing/History'
import AdminBillingVerification from './pages/admin/billing/Verification'
import RegisterShop from './pages/auth/RegisterShop'
import LicenseActivate from './pages/license/Activate'

function LicenseGuard({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()
  useEffect(() => {
    const checkLicense = async () => {
      try {
        const res = await api.get('/api/licensing/status/')
        if (res.data?.mode === 'STANDALONE' && !res.data?.valid) {
          navigate('/license/activate')
        }
      } catch {}
    }
    checkLicense()
  }, [navigate])
  return <>{children}</>
}

const router = createHashRouter([
  { path: '/login', element: <Login /> },
  { path: '/register-shop', element: <RegisterShop /> },
  { path: '/license/activate', element: <LicenseActivate /> },
  {
    path: '/',
    element: <LicenseGuard><Layout /></LicenseGuard>,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'dashboard', element: <Dashboard /> },
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
      { path: 'settings/backup', element: <Backup /> },
      { path: 'verification', element: <Verification /> },
      { path: 'billing/pricing', element: <Pricing /> },
      { path: 'billing/invoice/:invoice_no/pay', element: <Pay /> },
      { path: 'billing/history', element: <History /> },
      { path: 'admin/billing/verification', element: <AdminBillingVerification /> },
      { path: 'legal/terms', element: <Terms /> },
      { path: 'legal/privacy', element: <Privacy /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
