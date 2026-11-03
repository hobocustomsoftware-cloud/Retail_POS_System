import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import { useState } from 'react';

export default function Home() {
  const [pin, setPin] = useState('');
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Retail POS Mobile</Text>
      <TextInput placeholder="Enter PIN" value={pin} onChangeText={setPin} secureTextEntry style={{ borderWidth:1, borderColor:'#ccc', padding:10, width:'80%', marginBottom:10 }} />
      <TouchableOpacity style={{ backgroundColor: '#2563eb', padding: 15, borderRadius: 8 }}>
        <Text style={{ color: '#fff' }}>Login with PIN</Text>
      </TouchableOpacity>
    </View>
  );
}
