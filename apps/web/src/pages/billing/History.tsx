import { useEffect, useState } from 'react'
import api from '../../api/axios'

export default function History() {
  const [inv, setInv] = useState<any[]>([])
  useEffect(()=>{ api.get('/api/billing/invoices/').then(r=>setInv(r.data.results||r.data)) },[])
  return <div style={{padding:'2rem'}}><h1>Billing History</h1><table style={{width:'100%',background:'#fff'}}><thead><tr><th>Invoice No</th><th>Type</th><th>Amount</th><th>Status</th><th>Date</th></tr></thead><tbody>{inv.map((i:any)=><tr key={i.id}><td>{i.invoice_no}</td><td>{i.type}</td><td>{i.currency} {i.amount}</td><td>{i.status}</td><td>{i.created_at?.substring(0,10)}</td></tr>)}</tbody></table></div>
}
