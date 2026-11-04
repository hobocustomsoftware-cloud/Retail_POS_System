import { useEffect, useState } from 'react'
import api from '../../api/axios'

export default function Verification() {
  const [sales, setSales] = useState<any[]>([])
  useEffect(()=>{ api.get('/api/sales/sales/').then(r=>setSales((r.data.results||r.data).filter((s:any)=>s.status==='PENDING_VERIFICATION'))) },[])
  const verify = async (id:any, action:any)=>{ await api.post(`/api/sales/sales/${id}/verify_payment/`, {action}); window.location.reload() }
  return <div style={{padding:'1rem'}}><h1>Payment Verification (KPay/AYA Pay/CB Pay)</h1><table style={{width:'100%',background:'#fff'}}><thead><tr><th>Invoice</th><th>Total</th><th>Method</th><th>Action</th></tr></thead><tbody>{sales.map((s:any)=><tr key={s.id}><td>{s.invoice_no}</td><td>{s.total}</td><td>-</td><td><button onClick={()=>verify(s.id,'approve')}>Approve</button> <button onClick={()=>verify(s.id,'reject')}>Reject</button></td></tr>)}</tbody></table></div>
}
