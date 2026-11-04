import { useEffect, useState } from 'react'
import api from '../../api/axios'
export default function Suppliers() {
  const [items, setItems] = useState<any[]>([])
  const [name, setName] = useState('')
  useEffect(()=>{ api.get('/api/suppliers/suppliers/').then(r=>setItems(r.data.results||r.data)) },[])
  const save = async ()=>{ await api.post('/api/suppliers/suppliers/', {name}); const r=await api.get('/api/suppliers/suppliers/'); setItems(r.data.results||r.data); setName('') }
  return <div style={{padding:'1rem'}}><h1>Suppliers</h1><div style={{background:'#fff',padding:'1rem',marginBottom:'1rem'}}><input value={name} onChange={e=>setName(e.target.value)} placeholder='Name' style={{marginRight:8}}/><button onClick={save}>Add</button></div><table style={{width:'100%',background:'#fff'}}><thead><tr><th>Name</th><th>Phone</th></tr></thead><tbody>{items.map((i:any)=><tr key={i.id}><td>{i.name}</td><td>{i.phone}</td></tr>)}</tbody></table></div>
}
