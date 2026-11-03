import { Text, View, TouchableOpacity } from 'react-native';

export default function Home() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Retail POS Mobile</Text>
      <TouchableOpacity style={{ backgroundColor: '#2563eb', padding: 15, borderRadius: 8 }}>
        <Text style={{ color: '#fff' }}>Quick POS</Text>
      </TouchableOpacity>
    </View>
  );
}
