import { useState, useEffect } from 'react'
import api from '../../api/axios'

export default function Products() {
  const [products, setProducts] = useState<any[]>([])
  const [attrs, setAttrs] = useState<any[]>([])
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)

  useEffect(() => {
    api.get('/api/products/products/').then(r => setProducts(r.data.results || r.data)).catch(()=>{})
    api.get('/api/products/attributes/').then(r => setAttrs(r.data.results || r.data)).catch(()=>{})
  }, [])

  const createProduct = async () => {
    await api.post('/api/products/products/', { name, has_variants: true, is_active: true })
    const res = await api.get('/api/products/products/')
    setProducts(res.data.results || res.data)
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Products & Variants</h1>
      <div style={{ background: '#fff', padding: '1rem', border: '1px solid #e5e7eb', marginBottom: '1rem' }}>
        <h3>Add Product</h3>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Product Name" style={{ padding: '0.5rem', marginRight: '0.5rem' }} />
        <button onClick={createProduct} style={{ padding: '0.5rem 1rem' }}>Save</button>
      </div>
      <div style={{ background: '#fff', padding: '1rem', border: '1px solid #e5e7eb' }}>
        <h3>Attributes (Color/Size/Gender)</h3>
        {attrs.map((a:any)=><div key={a.id}><strong>{a.name}</strong>: {(a.values||[]).map((v:any)=><span key={v.id} style={{margin:'0 4px'}}>{v.value}</span>)}</div>)}
      </div>
      <div style={{ background: '#fff', padding: '1rem', border: '1px solid #e5e7eb', marginTop: '1rem' }}>
        <h3>Products</h3>
        <table style={{ width: '100%' }}>
          <thead><tr><th>Name</th><th>Variants</th></tr></thead>
          <tbody>
            {products.map((p:any)=><tr key={p.id}><td>{p.name}</td><td>{(p.variants||[]).length}</td></tr>)}
          </tbody>
        </table>
      </div>
    </div>
  )
}
