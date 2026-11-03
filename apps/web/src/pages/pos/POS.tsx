import { useState, useRef, useEffect } from 'react'
import api from '../../api/axios'

export default function POS() {
  const [cart, setCart] = useState<any[]>([])
  const [barcode, setBarcode] = useState('')
  const [products, setProducts] = useState<any[]>([])
  const [showPay, setShowPay] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('CASH')
  const [refNo, setRefNo] = useState('')
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
      setCart([...cart, { variant: item.id, name: item.sku, price: item.price, quantity: 1, total: item.price }])
    }
  }

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
      if (['KPAY', 'AYAPAY', 'CBPAY'].includes(paymentMethod)) {
        const res = await api.post('/api/sales/sales/wallet_payment/', {
          branch: 1,
          items: cart,
          subtotal: total,
          total: total,
          method: paymentMethod,
          reference_no: refNo
        })
        alert('Order submitted for verification: ' + res.data.invoice_no)
        setCart([])
        setShowPay(false)
        setRefNo('')
        return
      }
      const res = await api.post('/api/sales/sales/create_sale/', {
        branch: 1,
        items: cart,
        subtotal: total,
        total: total,
        paid_amount: total,
        change_amount: 0,
        payment_status: 'PAID',
        payments: [{ method: paymentMethod, amount: total }]
      })
      alert('Sale completed: ' + res.data.invoice_no)
      setCart([])
      setShowPay(false)
    } catch (err: any) {
      alert(err.response?.data?.error || 'Error completing sale')
    }
  }

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <div style={{ flex: 2, padding: '1rem', overflow: 'auto' }}>
        <form onSubmit={addByBarcode} style={{ marginBottom: '1rem' }}>
          <input ref={inputRef} value={barcode} onChange={(e) => setBarcode(e.target.value)} placeholder="Scan barcode or enter SKU" style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', boxSizing: 'border-box' }} autoFocus />
        </form>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '0.75rem' }}>
          {products.map((p: any) => (
            <div key={p.id} onClick={() => addItem(p)} style={{ border: '1px solid #d1d5db', padding: '0.75rem', background: '#fff', cursor: 'pointer' }}>
              <div style={{ fontWeight: 600 }}>{p.sku}</div>
              <div style={{ color: '#059669' }}>{Number(p.price).toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, background: '#fff', borderLeft: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}><h3 style={{ margin: 0 }}>Cart</h3></div>
        <div style={{ flex: 1, padding: '1rem', overflow: 'auto' }}>
          {cart.map((item, idx) => (<div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}><span>{item.name} x{item.quantity}</span><span>{Number(item.total).toFixed(2)}</span></div>))}
          {cart.length === 0 && <p style={{ color: '#6b7280' }}>No items</p>}
        </div>
        <div style={{ padding: '1rem', borderTop: '1px solid #e5e7eb' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '1.1rem' }}><span>Total</span><strong>{total.toFixed(2)}</strong></div>
          <button onClick={() => setShowPay(true)} disabled={cart.length === 0} style={{ width: '100%', padding: '0.75rem', background: '#059669', color: '#fff', border: 'none', borderRadius: '4px' }}>Payment</button>
        </div>
      </div>
      {showPay && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', padding: '2rem', borderRadius: '8px', width: 450 }}>
            <h3>Payment</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', marginBottom: '1rem' }}>
              {['CASH', 'CARD', 'MOBILE', 'KPAY', 'AYAPAY', 'CBPAY', 'CREDIT'].map(m => (
                <button key={m} onClick={() => setPaymentMethod(m)} style={{ padding: '0.5rem', background: paymentMethod === m ? '#2563eb' : '#e5e7eb', color: paymentMethod === m ? '#fff' : '#000', border: 'none', fontSize:'0.9rem' }}>{m}</button>
              ))}
            </div>
            {['KPAY', 'AYAPAY', 'CBPAY'].includes(paymentMethod) && (
              <div style={{ marginBottom: '1rem' }}>
                <p style={{ fontSize:'0.9rem', color:'#6b7280' }}>Upload screenshot & enter transaction ID after payment</p>
                <input value={refNo} onChange={e=>setRefNo(e.target.value)} placeholder="Transaction/Reference No." style={{ width:'100%', padding:'0.5rem', marginBottom:'0.5rem', boxSizing:'border-box' }} />
                <input type="file" style={{ width:'100%' }} />
              </div>
            )}
            <div style={{ fontSize: '1.3rem', textAlign: 'center', marginBottom: '1rem' }}>Total: {total.toFixed(2)}</div>
            <button onClick={checkout} style={{ width: '100%', padding: '0.75rem', background: '#059669', color: '#fff', border: 'none', marginBottom: '0.5rem' }}>{['KPAY', 'AYAPAY', 'CBPAY'].includes(paymentMethod) ? 'Submit for Verification' : 'Complete Sale'}</button>
            <button onClick={() => setShowPay(false)} style={{ width: '100%', padding: '0.5rem' }}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  )
}
