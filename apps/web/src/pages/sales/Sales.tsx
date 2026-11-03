import { useEffect, useState } from 'react'
import api from '../../api/axios'

export default function Sales() {
  const [sales, setSales] = useState<any[]>([])
  const [selected, setSelected] = useState<any>(null)
  const [returnItems, setReturnItems] = useState<any>({})
  useEffect(()=>{ load() },[])
  const load = ()=> api.get('/api/sales/sales/').then(r=>setSales(r.data.results||r.data))
  const view = (s:any)=>{ setSelected(s); api.get(`/api/sales/sales/${s.id}/`).then(r=>setSelected(r.data)) }
  const doReturn = async ()=>{
    const items = Object.entries(returnItems).filter(([k,v])=>v>0).map(([k,v])=>({variant: k.split('-')[0], quantity: v, restock:true}))
    await api.post('/api/sales/sales/complete_return/', {invoice_no: selected.invoice_no, items})
    alert('Return processed')
    setSelected(null)
  }
  return (
    <div style={{ padding: '1rem' }}>
      <h1>Sales History & Returns</h1>
      <table style={{ width:'100%', background:'#fff' }}>
        <thead><tr><th>Invoice</th><th>Total</th><th>Status</th><th>Date</th><th></th></tr></thead>
        <tbody>
          {sales.map((s:any)=><tr key={s.id}><td>{s.invoice_no}</td><td>{s.total}</td><td>{s.status}</td><td>{s.created_at?.substring(0,10)}</td><td><button onClick={()=>view(s)}>View/Return</button></td></tr>)}
        </tbody>
      </table>
      {selected && <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.5)',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <div style={{background:'#fff',padding:'2rem',width:600,maxHeight:'90vh',overflow:'auto'}}>
          <h2>Invoice {selected.invoice_no}</h2>
          <table style={{width:'100%'}}><thead><tr><th>Item</th><th>Qty</th><th>Price</th><th>Return Qty</th></tr></thead><tbody>
            {(selected.items||[]).map((it:any)=><tr key={it.id}><td>{it.variant}</td><td>{it.quantity}</td><td>{it.price}</td><td><input type='number' max={it.quantity} onChange={e=>setReturnItems({...returnItems,[it.variant+'-'+it.id]: Number(e.target.value)})} style={{width:60}}/></td></tr>)}
          </tbody></table>
          <button onClick={doReturn} style={{marginRight:8}}>Process Return (Restock)</button>
          <button onClick={()=>setSelected(null)}>Close</button>
        </div>
      </div>}
    </div>
  )
}
