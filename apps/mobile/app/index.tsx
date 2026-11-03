import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function Home() {
  const [pin, setPin] = useState('');
  const router = useRouter();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#f9fafb' }}>
      <Text style={{ fontSize: 24, marginBottom: 5, fontWeight: 'bold' }}>Retail POS</Text>
      <Text style={{ fontSize: 14, marginBottom: 30, color: '#6b7280' }}>HoBo Custom Software</Text>
      <TextInput placeholder="Enter PIN" value={pin} onChangeText={setPin} secureTextEntry keyboardType="numeric" maxLength={6} style={{ borderWidth:1, borderColor:'#d1d5db', padding:12, width:'80%', marginBottom:15, borderRadius:8, backgroundColor:'#fff' }} />
      <TouchableOpacity onPress={()=>router.push('/pos')} style={{ backgroundColor: '#2563eb', padding: 15, borderRadius: 8, width:'80%' }}>
        <Text style={{ color: '#fff', textAlign: 'center', fontSize: 16 }}>Login with PIN</Text>
      </TouchableOpacity>
    </View>
  );
}
