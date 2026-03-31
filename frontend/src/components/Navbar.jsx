import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const links = [
    { label: 'Servicios',  href: '#services'     },
    { label: 'Portafolio', href: '#portfolio'     },
    { label: 'Nosotros',   href: '#about'         },
    { label: 'Clientes',   href: '#testimonials'  },
  ]

  const close = () => setMenuOpen(false)

  return (
    <>
      <style>{`
        .nav-links-desktop { display: flex; gap: 32px; list-style: none; margin: 0; }
        .nav-cta-desktop   { display: inline-block; }
        .nav-ham {
          display: none;
          flex-direction: column; justify-content: center; align-items: center;
          gap: 5px; width: 40px; height: 40px;
          background: none; border: none; cursor: pointer; padding: 0; z-index: 200;
        }
        .nav-ham span {
          display: block; width: 22px; height: 1.5px;
          background: #f2ede6; border-radius: 2px;
          transition: transform 0.3s ease, opacity 0.3s ease;
        }
        .nav-ham.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .nav-ham.open span:nth-child(2) { opacity: 0; }
        .nav-ham.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

        .nav-overlay {
          position: fixed; inset: 0;
          background: rgba(5,5,7,0.97); backdrop-filter: blur(20px);
          z-index: 150;
          display: flex; flex-direction: column;
          justify-content: center; align-items: center; gap: 8px;
          transform: translateX(100%);
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .nav-overlay.open { transform: translateX(0); }
        .nav-overlay a {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(28px,7vw,44px); font-weight: 700;
          letter-spacing: -0.03em;
          color: rgba(242,237,230,0.35);
          text-decoration: none; transition: color 0.2s;
        }
        .nav-overlay a:hover { color: #f2ede6; }
        .nav-overlay-cta {
          margin-top: 28px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 15px; font-weight: 600;
          padding: 14px 36px; border-radius: 100px;
          background: linear-gradient(135deg,#7c3aed,#2563eb);
          color: #fff !important; text-decoration: none;
          letter-spacing: 0.04em;
        }

        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .nav-cta-desktop   { display: none !important; }
          .nav-ham           { display: flex !important; }
        }
      `}</style>

      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '20px 6%',
        background: scrolled ? 'rgba(5,5,7,0.92)' : 'rgba(5,5,7,0.5)',
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
        <ul className="nav-links-desktop">
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

        {/* CTA desktop */}
        <a href="#contact" className="nav-cta-desktop" style={{
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

        {/* Botón hamburguesa — solo móvil */}
        <button
          className={`nav-ham ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Menú overlay móvil */}
      <div className={`nav-overlay ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
        {links.map(l => (
          <a key={l.href} href={l.href} onClick={close}>{l.label}</a>
        ))}
        <a href="#contact" className="nav-overlay-cta" onClick={close}>
          Hablemos →
        </a>
      </div>
    </>
  )
}