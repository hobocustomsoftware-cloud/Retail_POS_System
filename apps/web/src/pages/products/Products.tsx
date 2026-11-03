import { useState, useEffect } from 'react'
import api from '../../api/axios'

export default function Products() {
  const [products, setProducts] = useState<any[]>([])
  const [attrs, setAttrs] = useState<any[]>([])
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [selectedAttrs, setSelectedAttrs] = useState<any[]>([])

  useEffect(() => {
    load()
    api.get('/api/products/attributes/').then(r => setAttrs(r.data.results || r.data)).catch(()=>{})
  }, [])

  const load = async () => {
    const res = await api.get('/api/products/products/')
    setProducts(res.data.results || res.data)
  }

  const createProduct = async () => {
    await api.post('/api/products/products/', { name, has_variants: true, is_active: true })
    setName('')
    load()
  }

  const generate = async () => {
    if (!selectedProduct) return
    await api.post('/api/products/products/generate_variants/', { product: selectedProduct.id, attribute_values: selectedAttrs, price })
    load()
    setSelectedProduct(null)
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Products & Variants</h1>
      <div style={{ background: '#fff', padding: '1rem', border: '1px solid #e5e7eb', marginBottom: '1rem', display:'flex', gap:8 }}>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Product Name" style={{ padding: '0.5rem' }} />
        <button onClick={createProduct} style={{ padding: '0.5rem 1rem' }}>Add Product</button>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
        <div style={{ background: '#fff', padding: '1rem', border: '1px solid #e5e7eb' }}>
          <h3>Products</h3>
          <table style={{ width: '100%' }}>
            <thead><tr><th>Name</th><th>Variants</th><th></th></tr></thead>
            <tbody>
              {products.map((p:any)=><tr key={p.id}><td>{p.name}</td><td>{(p.variants||[]).length}</td><td><button onClick={()=>setSelectedProduct(p)}>Generate Variants</button></td></tr>)}
            </tbody>
          </table>
        </div>
        <div style={{ background: '#fff', padding: '1rem', border: '1px solid #e5e7eb' }}>
          <h3>Attributes (Color/Size/Gender)</h3>
          {attrs.map((a:any)=><div key={a.id} style={{marginBottom:8}}><strong>{a.name}</strong><div style={{display:'flex',gap:4,flexWrap:'wrap'}}>{(a.values||[]).map((v:any)=><button key={v.id} onClick={()=>setSelectedAttrs([...selectedAttrs,v.id])} style={{padding:'2px 6px'}}>{v.value}</button>)}</div></div>)}
          {selectedProduct && <div style={{marginTop:'1rem'}}><input type='number' placeholder='Price' onChange={e=>setPrice(Number(e.target.value))} style={{padding:'0.5rem',marginRight:8}}/><button onClick={generate}>Create Variants</button></div>}
        </div>
      </div>
    </div>
  )
}
