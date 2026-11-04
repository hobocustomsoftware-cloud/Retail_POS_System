import { Link, Outlet } from 'react-router-dom'
import SubscriptionBanner from './SubscriptionBanner'
import NotificationBell from './NotificationBell'

export default function Layout() {
  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: "'Myanmar Thuriya', system-ui" }}>
      <aside style={{ width: 240, background: '#151515', color: '#fff', padding: '1rem', overflow: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '0 0 1rem 0' }}>
          <h2 style={{ margin: 0 }}>Retail POS</h2>
          <NotificationBell />
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <Link to="/pos" style={{ color: '#fff', textDecoration: 'none' }}>POS Terminal</Link>
          <Link to="/products" style={{ color: '#fff', textDecoration: 'none' }}>Products</Link>
          <Link to="/sales" style={{ color: '#fff', textDecoration: 'none' }}>Sales History</Link>
          <Link to="/purchases" style={{ color: '#fff', textDecoration: 'none' }}>Purchases/GRN</Link>
          <Link to="/inventory" style={{ color: '#fff', textDecoration: 'none' }}>Inventory</Link>
          <Link to="/warranty" style={{ color: '#fff', textDecoration: 'none' }}>Warranty</Link>
          <Link to="/verification" style={{ color: '#fff', textDecoration: 'none' }}>Payment Verification</Link>
          <hr style={{ borderColor: '#374151' }} />
          <Link to="/billing/pricing" style={{ color: '#fff', textDecoration: 'none' }}>Billing / Plans</Link>
          <Link to="/billing/history" style={{ color: '#fff', textDecoration: 'none' }}>Billing History</Link>
          <Link to="/admin/billing/verification" style={{ color: '#fff', textDecoration: 'none' }}>Admin Billing</Link>
          <hr style={{ borderColor: '#374151' }} />
          <Link to="/customers" style={{ color: '#fff', textDecoration: 'none' }}>Customers</Link>
          <Link to="/suppliers" style={{ color: '#fff', textDecoration: 'none' }}>Suppliers</Link>
          <Link to="/categories" style={{ color: '#fff', textDecoration: 'none' }}>Categories</Link>
          <Link to="/brands" style={{ color: '#fff', textDecoration: 'none' }}>Brands</Link>
          <Link to="/units" style={{ color: '#fff', textDecoration: 'none' }}>Units</Link>
          <Link to="/branches" style={{ color: '#fff', textDecoration: 'none' }}>Branches</Link>
          <Link to="/users" style={{ color: '#fff', textDecoration: 'none' }}>Users/Roles</Link>
          <Link to="/settings" style={{ color: '#fff', textDecoration: 'none' }}>Settings/License</Link>
        </nav>
      </aside>
      <main style={{ flex: 1, overflow: 'auto', background: '#f9fafb', display: 'flex', flexDirection: 'column' }}>
        <SubscriptionBanner />
        <div style={{ flex: 1, overflow: 'auto' }}><Outlet /></div>
      </main>
    </div>
  )
}

