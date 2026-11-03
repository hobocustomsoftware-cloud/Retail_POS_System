import { Link, Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'system-ui' }}>
      <aside style={{ width: 220, background: '#1f2937', color: '#fff', padding: '1rem' }}>
        <h2 style={{ margin: '0 0 1rem 0' }}>Retail POS</h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <Link to="/pos" style={{ color: '#fff', textDecoration: 'none' }}>POS Terminal</Link>
          <Link to="/products" style={{ color: '#fff', textDecoration: 'none' }}>Products</Link>
          <Link to="/sales" style={{ color: '#fff', textDecoration: 'none' }}>Sales</Link>
          <Link to="/purchases" style={{ color: '#fff', textDecoration: 'none' }}>Purchases</Link>
          <Link to="/inventory" style={{ color: '#fff', textDecoration: 'none' }}>Inventory</Link>
          <Link to="/warranty" style={{ color: '#fff', textDecoration: 'none' }}>Warranty</Link>
          <Link to="/settings" style={{ color: '#fff', textDecoration: 'none' }}>Settings</Link>
        </nav>
      </aside>
      <main style={{ flex: 1, overflow: 'auto', background: '#f9fafb' }}>
        <Outlet />
      </main>
    </div>
  )
}
