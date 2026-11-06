import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'

export default function Login() {
  const [pin, setPin] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // PIN login logic placeholder
    if (pin.length >= 4) navigate('/pos')
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #101114 0%, #1f2937 100%)',
      padding: '1rem'
    }}>
      <Card style={{ width: '100%', maxWidth: 420, padding: '2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>Retail POS</h1>
          <p style={{ marginTop: '0.5rem', color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>HoBo Custom Software</p>
        </div>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)' }}>
              Enter PIN
            </label>
            <input
              type="password"
              inputMode="numeric"
              maxLength={6}
              value={pin}
              onChange={e => setPin(e.target.value)}
              placeholder="••••••"
              style={{
                width: '100%',
                padding: '0.875rem 1rem',
                fontSize: '1.5rem',
                textAlign: 'center',
                letterSpacing: '0.5em',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                outline: 'none'
              }}
              autoFocus
            />
          </div>
          <Button type="submit" variant="primary" fullWidth size="lg">
            Login
          </Button>
        </form>
        <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.75rem', color: 'var(--color-text-tertiary)' }}>
          © 2026 HoBo Custom Software
        </p>
      </Card>
    </div>
  )
}
