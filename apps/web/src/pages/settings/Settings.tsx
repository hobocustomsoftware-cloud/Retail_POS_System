import { useState } from 'react'
import api from '../../api/axios'

export default function Settings() {
  const [key, setKey] = useState('')
  const [status, setStatus] = useState<any>(null)
  const activate = async () => {
    const res = await api.post('/api/licensing/activate/', { key })
    setStatus(res.data)
  }
  return (
    <div style={{ padding: '1rem' }}>
      <h1>Settings / License</h1>
      <div style={{ background:'#fff', padding:'1rem', border:'1px solid #e5e7eb', maxWidth:400 }}>
        <h3>License Activation (Standalone)</h3>
        <input value={key} onChange={e=>setKey(e.target.value)} placeholder="License Key" style={{ width:'100%', padding:'0.5rem', marginBottom:'0.5rem' }} />
        <button onClick={activate} style={{ padding:'0.5rem 1rem' }}>Activate</button>
        {status && <pre>{JSON.stringify(status,null,2)}</pre>}
      </div>
    </div>
  )
}
