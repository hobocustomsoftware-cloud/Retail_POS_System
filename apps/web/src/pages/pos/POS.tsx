import { useState, useRef } from 'react'
import api from '../api/axios'

export default function POS() {
  const [cart, setCart] = useState<any[]>([])
  const [barcode, setBarcode] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const total = cart.reduce((sum, item) => sum + item.total, 0)

  const addByBarcode = async (e: React.FormEvent) => {
    e.preventDefault()
    // Lookup by barcode
    setBarcode('')
    inputRef.current?.focus()
  }

  const checkout = async () => {
    try {
      const res = await api.post('/api/sales/sales/create_sale/', {
        branch: 1,
        items: cart,
        subtotal: total,
        total: total,
        paid_amount: total,
        payment_status: 'PAID',
        payments: [{ method: 'CASH', amount: total }]
      })
      alert('Sale completed: ' + res.data.invoice_no)
      setCart([])
    } catch (err) {
      alert('Error completing sale')
    }
  }

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <div style={{ flex: 2, padding: '1rem' }}>
        <form onSubmit={addByBarcode} style={{ marginBottom: '1rem' }}>
          <input
            ref={inputRef}
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            placeholder="Scan barcode or enter SKU"
            style={{ width: '100%', padding: '0.75rem', fontSize: '1rem' }}
            autoFocus
          />
        </form>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '0.75rem' }}>
          <div style={{ border: '1px solid #d1d5db', padding: '1rem', background: '#fff', cursor: 'pointer' }}>
            Sample Product
          </div>
        </div>
      </div>
      <div style={{ flex: 1, background: '#fff', borderLeft: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
          <h3 style={{ margin: 0 }}>Cart</h3>
        </div>
        <div style={{ flex: 1, padding: '1rem', overflow: 'auto' }}>
          {cart.length === 0 && <p style={{ color: '#6b7280' }}>No items</p>}
        </div>
        <div style={{ padding: '1rem', borderTop: '1px solid #e5e7eb' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>Total</span>
            <strong>{total.toFixed(2)}</strong>
          </div>
          <button onClick={checkout} style={{ width: '100%', padding: '0.75rem', background: '#059669', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Pay & Complete
          </button>
        </div>
      </div>
    </div>
  )
}
