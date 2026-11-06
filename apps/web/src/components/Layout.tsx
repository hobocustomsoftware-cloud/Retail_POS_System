import { Link, Outlet, useLocation } from 'react-router-dom'
import SubscriptionBanner from './SubscriptionBanner'
import NotificationBell from './NotificationBell'
import { LayoutDashboard, ShoppingCart, Package, FileText, Boxes, Shield, Users, Truck, Tag, Layers, GitBranch, UserCog, Settings, Receipt, CreditCard, FileCheck, Bell, Database } from 'lucide-react'

const navItems = [
  { section: 'Overview', items: [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  ]},
  { section: 'Sales', items: [
    { to: '/pos', icon: ShoppingCart, label: 'POS Terminal' },
    { to: '/sales', icon: Receipt, label: 'Sales History' },
  ]},
  { section: 'Inventory', items: [
    { to: '/products', icon: Package, label: 'Products' },
    { to: '/inventory', icon: Boxes, label: 'Inventory' },
    { to: '/purchases', icon: Truck, label: 'Purchases/GRN' },
    { to: '/warranty', icon: Shield, label: 'Warranty' },
  ]},
  { section: 'Master Data', items: [
    { to: '/customers', icon: Users, label: 'Customers' },
    { to: '/suppliers', icon: Truck, label: 'Suppliers' },
    { to: '/categories', icon: Tag, label: 'Categories' },
    { to: '/brands', icon: Layers, label: 'Brands' },
    { to: '/units', icon: Package, label: 'Units' },
    { to: '/branches', icon: GitBranch, label: 'Branches' },
    { to: '/users', icon: UserCog, label: 'Users & Roles' },
  ]},
  { section: 'Billing', items: [
    { to: '/billing/pricing', icon: CreditCard, label: 'Plans & Pricing' },
    { to: '/billing/history', icon: FileText, label: 'Billing History' },
    { to: '/verification', icon: FileCheck, label: 'Payment Verification' },
  ]},
  { section: 'Admin', items: [
    { to: '/admin/billing/verification', icon: FileCheck, label: 'Manual Verification' },
  ]},
  { section: 'System', items: [
    { to: '/settings', icon: Settings, label: 'Settings' },
    { to: '/settings/backup', icon: Database, label: 'Backup' },
  ]},
]

export default function Layout() {
  const location = useLocation()

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'var(--font-sans)' }}>
      <aside style={{ 
        width: 280, 
        background: 'var(--color-sidebar)', 
        color: '#fff', 
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: '#fff' }}>Retail POS</h2>
              <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)' }}>HoBo Custom Software</p>
            </div>
            <NotificationBell />
          </div>
        </div>
        <nav style={{ flex: 1, overflow: 'auto', padding: '1rem 0.75rem' }}>
          {navItems.map((group, idx) => (
            <div key={idx} style={{ marginBottom: '1.5rem' }}>
              <div style={{ 
                padding: '0 0.75rem', 
                marginBottom: '0.5rem',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'rgba(255,255,255,0.5)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                {group.section}
              </div>
              {group.items.map(item => {
                const Icon = item.icon
                const isActive = location.pathname === item.to || location.pathname.startsWith(item.to + '/')
                return (
                  <Link 
                    key={item.to} 
                    to={item.to} 
                    style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      color: '#fff', 
                      textDecoration: 'none',
                      padding: '0.625rem 0.75rem',
                      borderRadius: 'var(--radius-md)',
                      marginBottom: '0.25rem',
                      background: isActive ? 'var(--color-primary)' : 'transparent',
                      transition: 'background 0.15s ease',
                      fontSize: '0.875rem'
                    }}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </div>
          ))}
        </nav>
      </aside>
      <main style={{ flex: 1, overflow: 'auto', background: 'var(--color-bg)', display: 'flex', flexDirection: 'column' }}>
        <SubscriptionBanner />
        <div style={{ flex: 1, overflow: 'auto' }}>
          <Outlet />
        </div>
      </main>
    </div>
  )
}
