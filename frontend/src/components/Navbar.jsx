import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Servicios',  href: '#services' },
    { label: 'Portafolio', href: '#portfolio' },
    { label: 'Nosotros',   href: '#about' },
    { label: 'Clientes',   href: '#testimonials' },
  ]

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '20px 6%',
      background: scrolled ? 'rgba(5,5,7,0.85)' : 'rgba(5,5,7,0.5)',
      backdropFilter: 'blur(16px)',
      borderBottom: '0.5px solid rgba(255,255,255,0.06)',
      transition: 'background 0.3s',
    }}>
      {/* Logo */}
      <div style={{
        fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 18,
        letterSpacing: '-0.02em',
        background: 'linear-gradient(135deg,#e8e0ff 0%,#c4b5fd 30%,#a78bfa 50%,#7dd3fc 70%,#38bdf8 100%)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
      }}>
        DevStudio®
      </div>

      {/* Links desktop */}
      <ul style={{ display: 'flex', gap: 32, listStyle: 'none', margin: 0 }} className="nav-links-desktop">
        {links.map(l => (
          <li key={l.href}>
            <a href={l.href} style={{
              fontSize: 13, color: 'var(--text-dark2)', textDecoration: 'none',
              letterSpacing: '0.02em', transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.target.style.color = 'var(--text-dark)'}
              onMouseLeave={e => e.target.style.color = 'var(--text-dark2)'}
            >{l.label}</a>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a href="#contact" style={{
        fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 600,
        padding: '9px 20px', borderRadius: 100,
        background: 'linear-gradient(135deg,#7c3aed,#2563eb)',
        color: '#fff', textDecoration: 'none', letterSpacing: '0.04em',
        transition: 'opacity 0.2s',
      }}
        onMouseEnter={e => e.target.style.opacity = '0.85'}
        onMouseLeave={e => e.target.style.opacity = '1'}
      >
        Hablemos →
      </a>
    </nav>
  )
}
