import { useEffect, useState } from 'react'
import api from '../../api/axios'

export default function Customers() {
  const [items, setItems] = useState<any[]>([])
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  useEffect(()=>{ api.get('/api/customers/customers/').then(r=>setItems(r.data.results||r.data)) },[])
  const save = async ()=>{ await api.post('/api/customers/customers/', {name, phone}); const r=await api.get('/api/customers/customers/'); setItems(r.data.results||r.data); setName(''); setPhone('') }
  return <div style={{padding:'1rem'}}><h1>Customers</h1><div style={{background:'#fff',padding:'1rem',marginBottom:'1rem'}}><input value={name} onChange={e=>setName(e.target.value)} placeholder='Name' style={{marginRight:8}}/><input value={phone} onChange={e=>setPhone(e.target.value)} placeholder='Phone' style={{marginRight:8}}/><button onClick={save}>Add</button></div><table style={{width:'100%',background:'#fff'}}><thead><tr><th>Name</th><th>Phone</th><th>Balance</th></tr></thead><tbody>{items.map((i:any)=><tr key={i.id}><td>{i.name}</td><td>{i.phone}</td><td>{i.balance}</td></tr>)}</tbody></table></div>
}
