import { useEffect, useState } from 'react'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Table from '../../components/ui/Table'
import api from '../../api/axios'
import { TrendingUp, ShoppingCart, AlertTriangle, Users } from 'lucide-react'

export default function Dashboard() {
  const [stats, setStats] = useState({ sales: 0, transactions: 0, lowStock: 0, customers: 0 })
  const [recentSales, setRecentSales] = useState<any[]>([])

  useEffect(() => {
    // Placeholder data fetch - connect to real endpoints
    api.get('/api/sales/sales/').then(r => {
      const sales = r.data.results || r.data || []
      setRecentSales(sales.slice(0, 5))
      const total = sales.reduce((sum: number, s: any) => sum + Number(s.total || 0), 0)
      setStats(s => ({ ...s, sales: total, transactions: sales.length }))
    }).catch(() => {})
    api.get('/api/customers/customers/').then(r => {
      const list = r.data.results || r.data || []
      setStats(s => ({ ...s, customers: list.length }))
    }).catch(() => {})
  }, [])

  const kpis = [
    { label: "Today's Sales", value: `${stats.sales.toLocaleString()} MMK`, icon: TrendingUp, color: 'var(--color-success)' },
    { label: 'Transactions', value: stats.transactions, icon: ShoppingCart, color: 'var(--color-info)' },
    { label: 'Low Stock Items', value: stats.lowStock, icon: AlertTriangle, color: 'var(--color-warning)' },
    { label: 'Customers', value: stats.customers, icon: Users, color: 'var(--color-primary)' },
  ]

  return (
    <div style={{ padding: '1.5rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Dashboard</h1>
        <p style={{ marginTop: '0.25rem', color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>Overview of your retail operations</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon
          return (
            <Card key={idx} padding="1.25rem">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>{kpi.label}</p>
                  <p style={{ margin: '0.5rem 0 0 0', fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>{kpi.value}</p>
                </div>
                <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', background: `${kpi.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={22} style={{ color: kpi.color }} />
                </div>
              </div>
            </Card>
          )
        })}
      </div>
      <Card>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Recent Transactions</h2>
          <Badge variant="info">Latest 5</Badge>
        </div>
        <Table
          columns={[
            { key: 'invoice_no', label: 'Invoice' },
            { key: 'total', label: 'Total', render: (r) => `${Number(r.total || 0).toLocaleString()} MMK` },
            { key: 'payment_status', label: 'Status', render: (r) => <Badge variant={r.payment_status === 'PAID' ? 'success' : 'warning'}>{r.payment_status || 'PENDING'}</Badge> },
            { key: 'created_at', label: 'Date', render: (r) => r.created_at ? new Date(r.created_at).toLocaleString() : '-' },
          ]}
          data={recentSales}
          emptyMessage="No transactions yet"
        />
      </Card>
    </div>
  )
}
