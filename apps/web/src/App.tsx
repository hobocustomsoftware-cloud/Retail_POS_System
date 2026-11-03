import { useState } from 'react'

function App() {
  const [mode] = useState(import.meta.env.VITE_API_URL || 'http://localhost:8000')
  
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui' }}>
      <h1>Restaurant Bar POS - Kitchen & BBQ</h1>
      <p>Web App | Tablets | POS Terminals</p>
      <p>API: {mode}</p>
      <ul>
        <li>Order Taking (Dine-in/Takeout/Bar Tab)</li>
        <li>Kitchen Display System (KDS) - Kitchen/BBQ/Bar</li>
        <li>Table Management</li>
        <li>Payments (Cash/Card/Split)</li>
        <li>Receipts &amp; Printers</li>
      </ul>
    </div>
  )
}

export default App
