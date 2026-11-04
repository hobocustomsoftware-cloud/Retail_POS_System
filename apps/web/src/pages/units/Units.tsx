import { useEffect, useState } from 'react'
import api from '../../api/axios'
export default function Units() {
  const [items, setItems] = useState<any[]>([])
  const [name, setName] = useState(''); const [sn, setSn] = useState('')
  useEffect(()=>{ api.get('/api/suppliers/units/').then(r=>setItems(r.data.results||r.data)) },[])
  const save = async ()=>{ await api.post('/api/suppliers/units/', {name, short_name: sn}); const r=await api.get('/api/suppliers/units/'); setItems(r.data.results||r.data); setName(''); setSn('') }
  return <div style={{padding:'1rem'}}><h1>Units</h1><div style={{background:'#fff',padding:'1rem',marginBottom:'1rem'}}><input value={name} onChange={e=>setName(e.target.value)} placeholder='Name' style={{marginRight:8}}/><input value={sn} onChange={e=>setSn(e.target.value)} placeholder='Short' style={{marginRight:8}}/><button onClick={save}>Add</button></div><ul>{items.map((i:any)=><li key={i.id}>{i.name} ({i.short_name})</li>)}</ul></div>
}
