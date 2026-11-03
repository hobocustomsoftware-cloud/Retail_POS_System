import { Text, View, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';

const API = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8000';

export default function MobilePOS() {
  const [cart, setCart] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const total = cart.reduce((s,i)=>s + Number(i.price * i.qty),0);
  useEffect(()=>{
    axios.get(API+'/api/products/variants/').then(r=>setProducts(r.data.results||r.data)).catch(()=>{});
  },[]);
  const add = (p:any)=>{
    const ex = cart.find(c=>c.id===p.id);
    if(ex) setCart(cart.map(c=>c.id===p.id?{...c,qty:c.qty+1}:c));
    else setCart([...cart,{id:p.id,name:p.sku,price:p.price,qty:1}]);
  }
  const checkout = async ()=>{
    await axios.post(API+'/api/sales/sales/create_sale/',{branch:1,items:cart.map(c=>({variant:c.id,quantity:c.qty,price:c.price,total:c.price*c.qty})),subtotal:total,total:total,paid_amount:total,payment_status:'PAID',payments:[{method:'CASH',amount:total}]});
    alert('Sale completed (Cash)');
    setCart([]);
  }
  return (
    <View style={{ flex: 1, backgroundColor: '#f9fafb' }}>
      <View style={{ backgroundColor: '#151515', padding: 15 }}>
        <Text style={{ color: '#fff', fontSize: 18, textAlign: 'center', fontWeight:'bold' }}>Retail POS - HoBo Custom Software</Text>
      </View>
      <ScrollView style={{ flex: 1, padding: 10 }}>
        <Text style={{ fontSize: 16, marginBottom: 10 }}>Products</Text>
        {products.map((p:any)=><TouchableOpacity key={p.id} onPress={()=>add(p)} style={{backgroundColor:'#fff',padding:10,marginBottom:6,borderRadius:6}}><Text>{p.sku} - {Number(p.price).toFixed(2)}</Text></TouchableOpacity>)}
      </ScrollView>
      <View style={{ backgroundColor: '#fff', padding: 15, borderTopWidth: 1, borderTopColor: '#e5e7eb' }}>
        <Text style={{ fontSize: 16, marginBottom: 8 }}>Cart ({cart.length}) Total: {total.toFixed(2)}</Text>
        <TouchableOpacity onPress={checkout} disabled={cart.length===0} style={{ backgroundColor: '#aa0000', padding: 12, borderRadius: 8 }}>
          <Text style={{ color: '#fff', textAlign: 'center', fontSize: 16 }}>Pay Cash</Text>
        </TouchableOpacity>
        <Text style={{fontSize:11,color:'#6b7280',textAlign:'center',marginTop:4}}>POS: Cash only</Text>
      </View>
    </View>
  );
}
