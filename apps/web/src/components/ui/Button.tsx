import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
}

export default function Button({ 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  children, 
  style, 
  ...props 
}: ButtonProps) {
  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    fontFamily: 'var(--font-sans)',
    fontWeight: 500,
    borderRadius: 'var(--radius-md)',
    border: 'none',
    cursor: props.disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.15s ease',
    opacity: props.disabled ? 0.5 : 1,
    width: fullWidth ? '100%' : 'auto',
  }

  const sizes = {
    sm: { padding: '0.375rem 0.75rem', fontSize: '0.875rem' },
    md: { padding: '0.625rem 1rem', fontSize: '0.875rem' },
    lg: { padding: '0.75rem 1.5rem', fontSize: '0.9375rem' },
  }

  const variants = {
    primary: { background: 'var(--color-primary)', color: '#fff' },
    secondary: { background: 'var(--color-surface)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' },
    ghost: { background: 'transparent', color: 'var(--color-text-primary)' },
    danger: { background: 'var(--color-danger)', color: '#fff' },
    success: { background: 'var(--color-success)', color: '#fff' },
  }

  return (
    <button 
      {...props} 
      style={{ ...baseStyle, ...sizes[size], ...variants[variant], ...style }}
    >
      {children}
    </button>
  )
}
