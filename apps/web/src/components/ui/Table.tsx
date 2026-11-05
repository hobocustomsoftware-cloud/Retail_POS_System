import React from 'react'

interface Column {
  key: string
  label: string
  render?: (row: any) => React.ReactNode
}

interface TableProps {
  columns: Column[]
  data: any[]
  emptyMessage?: string
}

export default function Table({ columns, data, emptyMessage = 'No data available' }: TableProps) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: 'var(--color-bg)' }}>
            {columns.map(col => (
              <th key={col.key} style={{
                padding: '0.75rem 1rem',
                textAlign: 'left',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'var(--color-text-secondary)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                borderBottom: '1px solid var(--color-border)'
              }}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid var(--color-border-light)' }}>
                {columns.map(col => (
                  <td key={col.key} style={{ padding: '0.875rem 1rem', fontSize: '0.875rem' }}>
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
