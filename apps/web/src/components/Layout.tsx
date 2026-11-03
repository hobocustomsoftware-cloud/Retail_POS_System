import { Link, Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'system-ui' }}>
      <aside style={{ width: 240, background: '#1f2937', color: '#fff', padding: '1rem', overflow: 'auto' }}>
        <h2 style={{ margin: '0 0 1rem 0' }}>Retail POS</h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <Link to="/pos" style={{ color: '#fff', textDecoration: 'none' }}>POS Terminal</Link>
          <Link to="/products" style={{ color: '#fff', textDecoration: 'none' }}>Products</Link>
          <Link to="/sales" style={{ color: '#fff', textDecoration: 'none' }}>Sales History</Link>
          <Link to="/purchases" style={{ color: '#fff', textDecoration: 'none' }}>Purchases/GRN</Link>
          <Link to="/inventory" style={{ color: '#fff', textDecoration: 'none' }}>Inventory</Link>
          <Link to="/warranty" style={{ color: '#fff', textDecoration: 'none' }}>Warranty</Link>
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
      <main style={{ flex: 1, overflow: 'auto', background: '#f9fafb' }}>
        <Outlet />
      </main>
    </div>
  )
}

