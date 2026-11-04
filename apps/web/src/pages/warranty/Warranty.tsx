import { useState } from 'react'
import api from '../../api/axios'

export default function Warranty() {
  const [serial, setSerial] = useState('')
  const [result, setResult] = useState<any>(null)
  const check = async ()=>{ const r = await api.post('/api/warranty/claims/check_warranty/', {serial}); setResult(r.data) }
  return (
    <div style={{ padding: '1rem' }}>
      <h1>Warranty Claims</h1>
      <div style={{background:'#fff',padding:'1rem',marginBottom:'1rem',maxWidth:400}}>
        <h3>Check Warranty</h3>
        <input value={serial} onChange={e=>setSerial(e.target.value)} placeholder='Serial Number' style={{width:'100%',padding:'0.5rem',marginBottom:'0.5rem'}}/>
        <button onClick={check}>Check</button>
        {result && <pre>{JSON.stringify(result,null,2)}</pre>}
      </div>
    </div>
  )
}
