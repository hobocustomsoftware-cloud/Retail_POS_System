import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api/axios'
import Card from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'

export default function RegisterShop() {
  const [shop, setShop] = useState({ shop_name: '', address: '', phone: '', email: '' })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.post('/api/tenants/shops/', shop)
      alert('Shop created! Trial: 1 month + 7 days (37 days). View Only after expiry until subscription approved.')
      navigate('/login')
    } catch (err: any) {
      alert(err.response?.data?.detail || 'Failed to create shop')
    }
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-bg)', padding: '1rem' }}>
      <Card style={{ width: '100%', maxWidth: 520 }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Register Your Shop</h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>Gmail-only owner registration. Trial: 37 days (1 month + 7 days).</p>
        <form onSubmit={handleSubmit}>
          <Input label="Shop Name *" value={shop.shop_name} onChange={e => setShop({ ...shop, shop_name: e.target.value })} required />
          <Input label="Shop Email (Gmail) *" type="email" value={shop.email} onChange={e => setShop({ ...shop, email: e.target.value })} required />
          <Input label="Phone Number *" value={shop.phone} onChange={e => setShop({ ...shop, phone: e.target.value })} required />
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.375rem', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)' }}>Full Address *</label>
            <textarea
              required
              value={shop.address}
              onChange={e => setShop({ ...shop, address: e.target.value })}
              rows={3}
              style={{ width: '100%', padding: '0.625rem 0.875rem', fontSize: '0.875rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', outline: 'none', fontFamily: 'var(--font-sans)' }}
            />
          </div>
          <Button type="submit" variant="primary" fullWidth disabled={loading}>
            {loading ? 'Creating...' : 'Create Shop & Start Trial'}
          </Button>
        </form>
      </Card>
    </div>
  )
}
