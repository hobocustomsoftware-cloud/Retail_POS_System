import { useState } from 'react'

export default function DataTable({ columns, data, onSearch }: any) {
  const [search, setSearch] = useState('')
  const filtered = data.filter((row:any)=>{
    if(!search) return true
    return Object.values(row).join(' ').toLowerCase().includes(search.toLowerCase())
  })
  return <div>
    <input value={search} onChange={e=>{setSearch(e.target.value); onSearch?.(e.target.value)}} placeholder="Search..." style={{padding:'0.5rem',marginBottom:'0.5rem',width:'300px'}}/>
    <table style={{width:'100%',background:'#fff',border:'1px solid #e5e7eb'}}>
      <thead><tr>{columns.map((c:any)=><th key={c.key} style={{textAlign:'left',padding:'0.5rem',background:'#f9fafb'}}>{c.label}</th>)}</tr></thead>
      <tbody>{filtered.map((row:any,idx:number)=><tr key={idx}>{columns.map((c:any)=><td key={c.key} style={{padding:'0.5rem',borderTop:'1px solid #f3f4f6'}}>{row[c.key]}</td>)}</tr>)}</tbody>
    </table>
    <p style={{fontSize:'0.8rem',color:'#6b7280'}}>Total: {filtered.length}</p>
  </div>
}
