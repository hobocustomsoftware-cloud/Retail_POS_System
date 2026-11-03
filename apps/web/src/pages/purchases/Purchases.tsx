import { useEffect, useState } from 'react'
import api from '../../api/axios'

export default function Purchases() {
  const [grn, setGrn] = useState<any[]>([])
  useEffect(()=>{ api.get('/api/purchases/grn/').then(r=>setGrn(r.data.results||r.data)).catch(()=>{}) },[])
  const receive = async (id:any)=>{ await api.post(`/api/purchases/grn/${id}/receive/`); alert('GRN Received - Stock Updated'); }
  return (
    <div style={{ padding: '1rem' }}>
      <h1>Purchases / GRN</h1>
      <div style={{background:'#fff',padding:'1rem',marginBottom:'1rem'}}><button>Create PO</button> <button style={{marginLeft:8}}>Create GRN</button></div>
      <table style={{ width:'100%', background:'#fff' }}>
        <thead><tr><th>GRN No</th><th>Branch</th><th>Supplier</th><th></th></tr></thead>
        <tbody>
          {grn.map((g:any)=><tr key={g.id}><td>{g.grn_no}</td><td>{g.branch}</td><td>{g.supplier}</td><td><button onClick={()=>receive(g.id)}>Receive</button></td></tr>)}
        </tbody>
      </table>
    </div>
  )
}
