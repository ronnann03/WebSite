import { useEffect, useRef } from 'react'

function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const parent = canvas.parentElement
    canvas.width  = parent.offsetWidth
    canvas.height = parent.offsetHeight
    const ctx = canvas.getContext('2d')
    const W = canvas.width, H = canvas.height

    const pts = Array.from({ length: 70 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.4 + 0.3,
      hue: Math.random() > 0.5 ? 270 : 200,
      alpha: Math.random() * 0.4 + 0.1,
    }))

    let raf
    function draw() {
      ctx.clearRect(0, 0, W, H)
      ctx.fillStyle = '#050507'
      ctx.fillRect(0, 0, W, H)

      pts.forEach(p => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue},80%,70%,${p.alpha})`
        ctx.fill()
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0
      })

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 100) {
            ctx.beginPath()
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.strokeStyle = `rgba(167,139,250,${0.1 * (1 - dist / 100)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(raf)
  }, [])

  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0 }} />
}

const stats = [
  { num: '50+', label: 'Proyectos entregados' },
  { num: '5+',  label: 'Años de experiencia' },
  { num: '30+', label: 'Clientes satisfechos' },
  { num: '100%',label: 'Compromiso total' },
]

export default function Hero() {
  return (
    <section id="hero" style={{
      minHeight: '100vh',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      padding: 'clamp(120px,14vw,160px) 6% 100px',
      position: 'relative', overflow: 'hidden',
      background: 'var(--dark)',
    }}>
      <ParticleCanvas />

      {/* Scanlines */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(255,255,255,0.008) 3px,rgba(255,255,255,0.008) 4px)',
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, maxWidth: 900 }}>

        {/* Tag */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          fontSize: 12, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase',
          color: 'var(--accent)',
          border: '0.5px solid rgba(167,139,250,0.3)',
          padding: '6px 14px', borderRadius: 100, marginBottom: 32,
          background: 'rgba(167,139,250,0.06)',
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: '50%',
            background: 'var(--accent)', display: 'inline-block',
            animation: 'pulse-dot 2s ease-in-out infinite',
          }} />
          Disponible para proyectos · 2025
        </div>

        {/* Title */}
        <h1 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 'clamp(44px,7vw,88px)',
          fontWeight: 700, lineHeight: 0.95,
          letterSpacing: '-0.04em',
          marginBottom: 28,
        }}>
          Diseño &amp;<br />
          <span style={{
            background: 'linear-gradient(135deg,#e8e0ff 0%,#c4b5fd 30%,#a78bfa 50%,#7dd3fc 70%,#38bdf8 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>Desarrollo</span><br />
          <span style={{
            WebkitTextStroke: '1px rgba(167,139,250,0.4)',
            WebkitTextFillColor: 'transparent',
          }}>Digital.</span>
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: 'clamp(16px,2vw,20px)', fontWeight: 300,
          color: 'var(--text-dark2)', maxWidth: 540, lineHeight: 1.65, marginBottom: 48,
        }}>
          Creamos experiencias web que combinan diseño impactante con código sólido.
          Desde el concepto hasta el deploy.
        </p>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <a href="#portfolio" className="btn-primary">Ver proyectos</a>
          <a href="#contact"   className="btn-ghost">Conversemos</a>
        </div>

        {/* Stats */}
        <div style={{
          display: 'flex', gap: 48, marginTop: 80, paddingTop: 48,
          borderTop: '0.5px solid rgba(255,255,255,0.07)',
          flexWrap: 'wrap',
        }}>
          {stats.map(s => (
            <div key={s.label}>
              <div style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 36, fontWeight: 700, letterSpacing: '-0.04em',
                background: 'linear-gradient(135deg,#e8e0ff,#a78bfa,#38bdf8)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>{s.num}</div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4, letterSpacing: '0.02em' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}