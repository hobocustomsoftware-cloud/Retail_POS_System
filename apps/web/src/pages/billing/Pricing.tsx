import { useState } from 'react'
import api from '../../api/axios'
import { useNavigate } from 'react-router-dom'

export default function Pricing() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const buy = async (type:string, amount:number) => {
    setLoading(true)
    const res = await api.post('/api/billing/invoices/create_invoice/', {type, amount})
    navigate(`/billing/invoice/${res.data.invoice_no}/pay`)
    setLoading(false)
  }
  return <div style={{padding:'2rem'}}><h1>Pricing - Subscription / License</h1><div style={{display:'flex',gap:'1rem'}}>
    <div style={{background:'#fff',padding:'2rem',border:'1px solid #e5e7eb'}}><h3>Monthly</h3><p>MMK 150,000</p><button onClick={()=>buy('SUBSCRIPTION',150000)}>Subscribe</button></div>
    <div style={{background:'#fff',padding:'2rem',border:'1px solid #e5e7eb'}}><h3>License (Standalone)</h3><p>MMK 500,000</p><button onClick={()=>buy('LICENSE',500000)}>Buy License</button></div>
  </div></div>
}
