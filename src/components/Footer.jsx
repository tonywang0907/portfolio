export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '24px 40px',
      background: 'var(--bg)',
    }}>
      <div style={{
        maxWidth: 'var(--max-w)',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        flexWrap: 'wrap',
      }}>
        <p style={{ fontSize: 12, color: 'var(--text-dim)', letterSpacing: '0.01em' }}>
          © 2026 Tony Wang
        </p>
        <div style={{ display: 'flex', gap: 20 }}>
          {[
            { label: 'Email', href: 'mailto:tony0907wang@gmail.com' },
            { label: 'LinkedIn', href: 'https://www.linkedin.com/in/tonywang0907/' },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              style={{ fontSize: 12, color: 'var(--text-dim)', letterSpacing: '0.01em', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-dim)'}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
