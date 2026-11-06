import { useState, useRef, useEffect } from 'react'
import api from '../../api/axios'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import { Search, Trash2, Minus, Plus, CreditCard } from 'lucide-react'

export default function POS() {
  const [cart, setCart] = useState<any[]>([])
  const [barcode, setBarcode] = useState('')
  const [products, setProducts] = useState<any[]>([])
  const [showPay, setShowPay] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const total = cart.reduce((sum, item) => sum + Number(item.total || item.price * item.quantity), 0)

  useEffect(() => {
    api.get('/api/products/variants/').then(res => setProducts(res.data.results || res.data)).catch(() => {})
  }, [])

  const addItem = (item: any) => {
    const existing = cart.find(c => c.variant === item.id)
    if (existing) {
      setCart(cart.map(c => c.variant === item.id ? { ...c, quantity: c.quantity + 1, total: (c.quantity + 1) * c.price } : c))
    } else {
      setCart([...cart, { variant: item.id, name: item.sku, price: Number(item.price), quantity: 1, total: Number(item.price) }])
    }
  }

  const updateQty = (idx: number, delta: number) => {
    setCart(cart.map((c, i) => {
      if (i !== idx) return c
      const qty = Math.max(1, c.quantity + delta)
      return { ...c, quantity: qty, total: qty * c.price }
    }))
  }

  const removeItem = (idx: number) => setCart(cart.filter((_, i) => i !== idx))

  const addByBarcode = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!barcode) return
    const found = products.find((p: any) => p.barcode === barcode || p.sku === barcode)
    if (found) addItem(found)
    setBarcode('')
    inputRef.current?.focus()
  }

  const checkout = async () => {
    try {
      const res = await api.post('/api/sales/sales/create_sale/', {
        branch: 1,
        items: cart.map(c => ({ variant: c.variant, quantity: c.quantity, price: c.price, total: c.total })),
        subtotal: total,
        total: total,
        paid_amount: total,
        change_amount: 0,
        payment_status: 'PAID',
        payments: [{ method: 'CASH', amount: total }]
      })
      alert('Sale completed: ' + (res.data.invoice_no || 'Success'))
      setCart([])
      setShowPay(false)
    } catch (err: any) {
      alert(err.response?.data?.detail || err.response?.data?.error || 'Error completing sale')
    }
  }

  return (
    <div style={{ display: 'flex', height: '100%', gap: 0 }}>
      {/* Products Panel */}
      <div style={{ flex: 1, padding: '1.5rem', overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '1rem' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>POS Terminal</h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', marginTop: '0.25rem' }}>Scan barcode or select products</p>
        </div>
        <form onSubmit={addByBarcode} style={{ marginBottom: '1rem', position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-tertiary)' }} />
          <input
            ref={inputRef}
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            placeholder="Scan barcode or enter SKU..."
            style={{
              width: '100%',
              padding: '0.75rem 0.75rem 0.75rem 2.75rem',
              fontSize: '0.9375rem',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              outline: 'none',
              background: 'var(--color-surface)'
            }}
            autoFocus
          />
        </form>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.75rem' }}>
          {products.map((p: any) => (
            <Card key={p.id} padding="1rem" style={{ cursor: 'pointer', transition: 'all 0.15s ease' }}>
              <div onClick={() => addItem(p)}>
                <div style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.25rem' }}>{p.sku || p.name || 'Product'}</div>
                <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.75rem', marginBottom: '0.5rem' }}>{p.barcode || 'No barcode'}</div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-primary)' }}>{Number(p.price || 0).toLocaleString()} MMK</div>
              </div>
            </Card>
          ))}
          {products.length === 0 && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem', color: 'var(--color-text-secondary)' }}>No products found</div>
          )}
        </div>
      </div>

      {/* Cart Panel */}
      <div style={{ width: 400, background: 'var(--color-surface)', borderLeft: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Cart</h2>
          <Badge variant="info">{cart.length} items</Badge>
        </div>
        <div style={{ flex: 1, padding: '1rem', overflow: 'auto' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-secondary)' }}>Cart is empty</div>
          ) : (
            cart.map((item, idx) => (
              <div key={idx} style={{ padding: '0.875rem', border: '1px solid var(--color-border-light)', borderRadius: 'var(--radius-md)', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 500, fontSize: '0.875rem' }}>{item.name}</span>
                  <button onClick={() => removeItem(idx)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-tertiary)' }}>
                    <Trash2 size={16} />
                  </button>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <button onClick={() => updateQty(idx, -1)} style={{ width: 28, height: 28, borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', background: 'var(--color-surface)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Minus size={14} />
                    </button>
                    <span style={{ fontSize: '0.875rem', fontWeight: 500, minWidth: 24, textAlign: 'center' }}>{item.quantity}</span>
                    <button onClick={() => updateQty(idx, 1)} style={{ width: 28, height: 28, borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', background: 'var(--color-surface)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Plus size={14} />
                    </button>
                  </div>
                  <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>{Number(item.total).toLocaleString()}</span>
                </div>
              </div>
            ))
          )}
        </div>
        <div style={{ padding: '1.25rem 1.5rem', borderTop: '1px solid var(--color-border)', background: 'var(--color-bg)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Total</span>
            <span style={{ fontSize: '1.25rem', fontWeight: 700 }}>{total.toLocaleString()} MMK</span>
          </div>
          <Button variant="primary" fullWidth size="lg" disabled={cart.length === 0} onClick={() => setShowPay(true)}>
            <CreditCard size={18} /> Pay Cash
          </Button>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)', textAlign: 'center', marginTop: '0.5rem' }}>
            POS: Cash only (Wallets available as Add-on)
          </p>
        </div>
      </div>

      {/* Payment Modal */}
      {showPay && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <Card style={{ width: 420, padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>Payment</h3>
            <div style={{ background: 'var(--color-bg)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Total Amount</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-primary)' }}>{total.toLocaleString()} MMK</div>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <Badge variant="success">CASH ONLY</Badge>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <Button variant="secondary" fullWidth onClick={() => setShowPay(false)}>Cancel</Button>
              <Button variant="primary" fullWidth onClick={checkout}>Complete Sale</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
