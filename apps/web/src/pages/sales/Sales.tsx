import { useEffect, useState } from 'react'
import api from '../../api/axios'

export default function Sales() {
  const [sales, setSales] = useState<any[]>([])
  useEffect(()=>{
    api.get('/api/sales/sales/').then(r=>setSales(r.data.results||r.data)).catch(()=>{})
  },[])
  return (
    <div style={{ padding: '1rem' }}>
      <h1>Sales History</h1>
      <table style={{ width:'100%', background:'#fff' }}>
        <thead><tr><th>Invoice</th><th>Total</th><th>Status</th><th>Date</th></tr></thead>
        <tbody>
          {sales.map((s:any)=><tr key={s.id}><td>{s.invoice_no}</td><td>{s.total}</td><td>{s.status}</td><td>{s.created_at}</td></tr>)}
        </tbody>
      </table>
    </div>
  )
}
