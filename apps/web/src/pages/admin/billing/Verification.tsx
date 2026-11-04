import { useEffect, useState } from 'react'
import api from '../../api/axios'

export default function AdminBillingVerification() {
  const [proofs, setProofs] = useState<any[]>([])
  const [note, setNote] = useState('')
  useEffect(()=>{ api.get('/api/billing/proofs/').then(r=>setProofs((r.data.results||r.data).filter((p:any)=>p.status==='PENDING'))) },[])
  const approve = async (id:any)=>{ await api.post(`/api/billing/proofs/${id}/approve/`); window.location.reload() }
  const reject = async (id:any)=>{ await api.post(`/api/billing/proofs/${id}/reject/`, {note}); window.location.reload() }
  return <div style={{padding:'2rem'}}><h1>Manual Payment Verification</h1><table style={{width:'100%',background:'#fff'}}><thead><tr><th>Invoice</th><th>Method</th><th>Phone</th><th>Screenshot</th><th>Action</th></tr></thead><tbody>{proofs.map((p:any)=><tr key={p.id}><td>{p.invoice}</td><td>{p.method}</td><td>{p.sender_phone}</td><td><a href={p.screenshot} target="_blank">View</a></td><td><button onClick={()=>approve(p.id)}>Approve</button> <input placeholder='Reject note' onChange={e=>setNote(e.target.value)} style={{marginLeft:4}}/><button onClick={()=>reject(p.id)} style={{marginLeft:4}}>Reject</button></td></tr>)}</tbody></table></div>
}
