import { useEffect, useState } from 'react'
import api from '../../api/axios'
export default function Brands() {
  const [items, setItems] = useState<any[]>([])
  const [name, setName] = useState('')
  useEffect(()=>{ api.get('/api/suppliers/brands/').then(r=>setItems(r.data.results||r.data)) },[])
  const save = async ()=>{ await api.post('/api/suppliers/brands/', {name}); const r=await api.get('/api/suppliers/brands/'); setItems(r.data.results||r.data); setName('') }
  return <div style={{padding:'1rem'}}><h1>Brands</h1><div style={{background:'#fff',padding:'1rem',marginBottom:'1rem'}}><input value={name} onChange={e=>setName(e.target.value)} placeholder='Name' style={{marginRight:8}}/><button onClick={save}>Add</button></div><ul>{items.map((i:any)=><li key={i.id}>{i.name}</li>)}</ul></div>
}
