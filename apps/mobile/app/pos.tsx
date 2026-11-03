import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';

export default function MobilePOS() {
  const [cart, setCart] = useState<any[]>([]);
  const total = cart.reduce((s,i)=>s+i.price,0);
  return (
    <View style={{ flex: 1, backgroundColor: '#f9fafb' }}>
      <View style={{ backgroundColor: '#1f2937', padding: 15 }}>
        <Text style={{ color: '#fff', fontSize: 18, textAlign: 'center' }}>Retail POS - HoBo Custom Software</Text>
      </View>
      <ScrollView style={{ flex: 1, padding: 10 }}>
        <Text style={{ fontSize: 16, marginBottom: 10 }}>Products</Text>
      </ScrollView>
      <View style={{ backgroundColor: '#fff', padding: 15, borderTopWidth: 1, borderTopColor: '#e5e7eb' }}>
        <Text style={{ fontSize: 18, marginBottom: 10 }}>Total: {total.toFixed(2)}</Text>
        <TouchableOpacity style={{ backgroundColor: '#059669', padding: 12, borderRadius: 8 }}>
          <Text style={{ color: '#fff', textAlign: 'center', fontSize: 16 }}>Pay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
