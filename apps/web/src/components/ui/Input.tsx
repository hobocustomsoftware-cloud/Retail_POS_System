import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export default function Input({ label, error, style, ...props }: InputProps) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      {label && (
        <label style={{ display: 'block', marginBottom: '0.375rem', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)' }}>
          {label}
        </label>
      )}
      <input
        {...props}
        style={{
          width: '100%',
          padding: '0.625rem 0.875rem',
          fontSize: '0.875rem',
          border: `1px solid ${error ? 'var(--color-danger)' : 'var(--color-border)'}`,
          borderRadius: 'var(--radius-md)',
          outline: 'none',
          background: 'var(--color-surface)',
          color: 'var(--color-text-primary)',
          transition: 'border-color 0.15s ease',
          ...style
        }}
      />
      {error && <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.75rem', color: 'var(--color-danger)' }}>{error}</p>}
    </div>
  )
}
