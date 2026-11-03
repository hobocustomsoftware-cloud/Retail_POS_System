export default function Login() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#f3f4f6' }}>
      <div style={{ background: '#fff', padding: '2rem', borderRadius: '8px', width: 320 }}>
        <h2 style={{ textAlign: 'center', marginTop: 0 }}>Retail POS Login</h2>
        <input placeholder="Username" style={{ width: '100%', padding: '0.5rem', marginBottom: '0.75rem', boxSizing: 'border-box' }} />
        <input type="password" placeholder="Password or PIN" style={{ width: '100%', padding: '0.5rem', marginBottom: '0.75rem', boxSizing: 'border-box' }} />
        <button style={{ width: '100%', padding: '0.5rem', background: '#2563eb', color: '#fff', border: 'none' }}>Login</button>
      </div>
    </div>
  )
}
