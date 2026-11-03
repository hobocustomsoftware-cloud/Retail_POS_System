import { useEffect, useState } from 'react'
import api from '../../api/axios'

export default function Inventory() {
  const [stock, setStock] = useState<any[]>([])
  useEffect(()=>{ api.get('/api/inventory/stock/').then(r=>setStock(r.data.results||r.data)).catch(()=>{}) },[])
  return (
    <div style={{ padding: '1rem' }}>
      <h1>Inventory / Stock</h1>
      <div style={{background:'#fff',padding:'1rem',marginBottom:'1rem'}}><button>Stock Adjustment</button></div>
      <table style={{ width:'100%', background:'#fff' }}>
        <thead><tr><th>Branch</th><th>Variant</th><th>Qty</th><th>Min Qty</th><th>Status</th></tr></thead>
        <tbody>
          {stock.map((s:any)=><tr key={s.id}><td>{s.branch}</td><td>{s.variant}</td><td style={{color: s.quantity < s.min_quantity ? 'red' : 'green'}}>{s.quantity}</td><td>{s.min_quantity}</td><td>{s.quantity < s.min_quantity ? 'LOW' : 'OK'}</td></tr>)}
        </tbody>
      </table>
    </div>
  )
}
