import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import api from '../../api/axios'

export default function Pay() {
  const { invoice_no } = useParams()
  const navigate = useNavigate()
  const [method, setMethod] = useState('AYAPAY')
  const [phone, setPhone] = useState('')
  const [file, setFile] = useState<any>(null)
  const submit = async (e:any) => {
    e.preventDefault()
    const form = new FormData()
    form.append('invoice', invoice_no)
    form.append('method', method)
    form.append('sender_phone', phone)
    form.append('screenshot', file)
    await api.post('/api/billing/proofs/', form, {headers:{'Content-Type':'multipart/form-data'}})
    navigate('/billing/history')
  }
  return <div style={{padding:'2rem',maxWidth:600}}><h1>ငွေပေးချေမှု</h1><p>Invoice: {invoice_no}</p><div style={{background:'#fff',padding:'1rem',border:'1px solid #e5e7eb',marginBottom:'1rem'}}><p>လွှဲရမည့်အကောင့်: <b>AYA Pay / KPay / CB Pay</b></p><p style={{color:'#dc2626'}}>မှတ်စု(Transfer Note) ထဲတွင် <b>{invoice_no}</b> ကို ရေးပေးပါ။</p></div><form onSubmit={submit}><select value={method} onChange={e=>setMethod(e.target.value)} style={{width:'100%',padding:'0.5rem',marginBottom:'0.75rem'}}><option value="AYAPAY">AYA Pay</option><option value="KPAY">KPay</option><option value="CBPAY">CB Pay</option></select><input placeholder="ပေးချေသူ ဖုန်းနံပါတ် (optional)" value={phone} onChange={e=>setPhone(e.target.value)} style={{width:'100%',padding:'0.5rem',marginBottom:'0.75rem'}}/><input type="file" accept="image/*" onChange={e=>setFile(e.target.files?.[0])} required style={{width:'100%',marginBottom:'0.75rem'}}/><button type="submit" style={{padding:'0.75rem 1.5rem',background:'#059669',color:'#fff',border:'none'}}>ငွေပေးချေမှု Screenshot တင်သွင်းမည်</button></form></div>
}
