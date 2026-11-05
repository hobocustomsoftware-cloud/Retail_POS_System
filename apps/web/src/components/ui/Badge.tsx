import React from 'react'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral'
}

export default function Badge({ children, variant = 'neutral' }: BadgeProps) {
  const variants = {
    success: { background: '#DCFCE7', color: '#166534' },
    warning: { background: '#FEF3C7', color: '#92400E' },
    danger: { background: '#FEE2E2', color: '#991B1B' },
    info: { background: '#DBEAFE', color: '#1E40AF' },
    neutral: { background: 'var(--color-border-light)', color: 'var(--color-text-secondary)' },
  }

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      padding: '0.25rem 0.625rem',
      borderRadius: '9999px',
      fontSize: '0.75rem',
      fontWeight: 500,
      ...variants[variant]
    }}>
      {children}
    </span>
  )
}
