import { useState } from 'react'
import api from '../../api/axios'

export default function RegisterShop() {
  const [email, setEmail] = useState('')
  const [shop, setShop] = useState({shop_name:'', address:'', phone:'', email:''})
  const googleLogin = async () => {
    const res = await api.post('/api/accounts/google-register-shop/', {email: shop.email || email})
    alert('Login/Signup with Gmail: ' + res.data.email)
  }
  const createShop = async (e:any) => {
    e.preventDefault()
    await api.post('/api/tenants/shops/', shop)
    alert('Shop created! Trial: 7 days free. After 7 days view-only until subscription.')
  }
  return <div style={{padding:'2rem',maxWidth:600}}><h1>ဆိုင်အသစ်ဖွင့်ရန် (Owner - Gmail Only)</h1><div style={{background:'#fff',padding:'1rem',marginBottom:'1rem'}}><input placeholder='Gmail address' value={email} onChange={e=>setEmail(e.target.value)} style={{width:'100%',padding:'0.5rem',marginBottom:'0.5rem'}}/><button onClick={googleLogin}>Gmail ဖြင့် ဝင်ရောက်/စာရင်းသွင်း</button><p style={{fontSize:'0.8rem',color:'#6b7280'}}>Gmail နှင့်သာ ဝင်ရောက်ခွင့်ရှိသည်။ Password reset မလိုအပ်ပါ။</p></div><form onSubmit={createShop} style={{background:'#fff',padding:'1rem'}}><input required placeholder='ဆိုင်အမည် *' onChange={e=>setShop({...shop,shop_name:e.target.value})} style={{width:'100%',padding:'0.5rem',marginBottom:'0.5rem'}}/><textarea required placeholder='လိပ်စာ အပြည့်အစုံ *' onChange={e=>setShop({...shop,address:e.target.value})} style={{width:'100%',padding:'0.5rem',marginBottom:'0.5rem'}}/><input required placeholder='ဖုန်းနံပါတ် *' onChange={e=>setShop({...shop,phone:e.target.value})} style={{width:'100%',padding:'0.5rem',marginBottom:'0.5rem'}}/><input required type='email' placeholder='ဆိုင်အီးမေးလ် *' onChange={e=>setShop({...shop,email:e.target.value})} style={{width:'100%',padding:'0.5rem',marginBottom:'0.5rem'}}/><button type='submit'>ဆိုင်ဖွင့်မည် (Trial 7 ရက်)</button></form></div>
}
