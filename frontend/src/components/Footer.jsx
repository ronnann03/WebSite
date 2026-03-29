const links = [
  { label: 'LinkedIn',  href: '#' },
  { label: 'GitHub',    href: '#' },
  { label: 'Instagram', href: '#' },
]

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--dark2)', padding: '32px 6%',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      borderTop: '0.5px solid rgba(255,255,255,0.06)',
      flexWrap: 'wrap', gap: 16,
    }}>
      <div style={{
        fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 16,
        background: 'linear-gradient(135deg,#e8e0ff 0%,#c4b5fd 30%,#a78bfa 50%,#7dd3fc 70%,#38bdf8 100%)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
      }}>DevStudio®</div>

      <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
        ©2025 DevStudio. Hecho con ❤ en Perú.
      </div>

      <div style={{ display: 'flex', gap: 24 }}>
        {links.map(l => (
          <a key={l.label} href={l.href} style={{
            fontSize: 13, color: 'var(--text-muted)',
            textDecoration: 'none', transition: 'color 0.2s',
          }}
            onMouseEnter={e => e.target.style.color = 'var(--accent)'}
            onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
          >{l.label}</a>
        ))}
      </div>
    </footer>
  )
}