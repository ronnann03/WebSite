import { useEffect, useRef, useState, useCallback } from 'react'

const HEADLINES = [
  { hl: 'Desarrollo',                      loc: 'Basado' },
  { hl: 'Desarrollo Web',                  loc: 'Basado en' },
  { hl: 'Desarrollo Web &',                loc: 'Basado en Perú' },
  { hl: 'Desarrollo Web & Diseño',         loc: 'Basado en Perú, Ancash' },
  { hl: 'Desarrollo Web & Diseño Digital.', loc: 'Basado en Perú, Ancash — Huaraz' },
]

const STEP  = 1100   // ms entre cada swap de palabra
const TOTAL = HEADLINES.length * STEP + 1200  // duración total de la intro

// ─── Canvas de partículas ────────────────────────────────────────────────────
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

    const pts = Array.from({ length: 80 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.3,
      hue: Math.random() > 0.5 ? 270 : 200,
      alpha: Math.random() * 0.5 + 0.1,
    }))

    let raf
    function draw() {
      ctx.clearRect(0, 0, W, H)
      ctx.fillStyle = '#000000e8'
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
          if (dist < 90) {
            ctx.beginPath()
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.strokeStyle = `rgba(167,139,250,${0.12 * (1 - dist / 90)})`
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

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, zIndex: 1 }}
    />
  )
}

// ─── Slot animado (slide up / swap) ─────────────────────────────────────────
function AnimSlot({ text, fontSize, color, fontWeight = '700cc', letterSpacing = '-0.04em', isGradient = false }) {
  const spanRef = useRef(null)
  const slotRef = useRef(null)
  const prevText = useRef(null)
  const EASE = 'cubic-bezier(0.16,1,0.3,1)'

  useEffect(() => {
    const slot = slotRef.current
    const span = spanRef.current
    if (!slot || !span) return

    if (prevText.current === null) {
      // primera vez: slide in desde abajo
      slot.style.height = 'auto'
      requestAnimationFrame(() => requestAnimationFrame(() => {
        span.style.transition = `transform 1s ${EASE}`
        span.style.transform = 'translateY(0)'
      }))
    } else {
      // swap: sale por arriba, entra desde abajo
      span.style.transition = `transform 0.6s ${EASE}`
      span.style.transform = 'translateY(-110%)'
      setTimeout(() => {
        slot.style.height = '0'
        span.style.transition = 'none'
        span.style.transform = 'translateY(110%)'
        slot.style.height = 'auto'
        requestAnimationFrame(() => requestAnimationFrame(() => {
          span.style.transition = `transform 0.9s ${EASE}`
          span.style.transform = 'translateY(0)'
        }))
      }, 650)
    }
    prevText.current = text
  }, [text])

  const gradStyle = isGradient ? {
    background: 'linear-gradient(135deg,#e8e0ff 0%,#c4b5fd 30%,#a78bfa 50%,#7dd3fc 70%,#38bdf8 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  } : {}

  return (
    <div ref={slotRef} style={{ overflow: 'hidden', height: 0 }}>
      <span
        ref={spanRef}
        style={{
          display: 'block',
          fontSize,
          fontWeight,
          color: isGradient ? undefined : color,
          letterSpacing,
          lineHeight: 1.05,
          transform: 'translateY(110%)',
          whiteSpace: 'nowrap',
          ...gradStyle,
        }}
      >
        {text}
      </span>
    </div>
  )
}

// ─── Componente principal ────────────────────────────────────────────────────
export default function IntroScreen({ onComplete }) {
  const [step, setStep]         = useState(0)
  const [showSub, setShowSub]   = useState(false)
  const [showBrand, setShowBrand] = useState(false)
  const [progress, setProgress] = useState(0)
  const [done, setDone]         = useState(false)
  const rafRef  = useRef(null)
  const startRef = useRef(null)

  const animProgress = useCallback(() => {
    startRef.current = null
    function tick(ts) {
      if (!startRef.current) startRef.current = ts
      const pct = Math.min(((ts - startRef.current) / TOTAL) * 100, 100)
      setProgress(pct)
      if (pct < 100) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
  }, [])

  useEffect(() => {
    const timers = []
    const T = (fn, ms) => { const id = setTimeout(fn, ms); timers.push(id) }

    animProgress()

    HEADLINES.forEach((_, i) => T(() => setStep(i), i * STEP))
    T(() => setShowSub(true),   STEP * 1.8)
    T(() => setShowBrand(true), (HEADLINES.length - 1) * STEP + 600)

    T(() => {
      setDone(true)
      if (onComplete) setTimeout(onComplete, 900)
    }, TOTAL)

    return () => {
      timers.forEach(clearTimeout)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [animProgress, onComplete])

  const current = HEADLINES[step]

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      fontFamily: "'Space Grotesk', system-ui, sans-serif",
      background: '#050507',
      opacity: done ? 0 : 1,
      transition: done ? 'opacity 0.9s ease' : 'none',
      pointerEvents: done ? 'none' : 'all',
    }}>
      {/* Partículas */}
      <ParticleCanvas />

      {/* Scanlines */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
        background: 'repeating-linear-gradient(0deg,transparent,transparent 3px,rgb(0, 0, 0) 3px,rgba(255,255,255,0.012) 4px)',
      }} />

      {/* Contenido */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 10,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        padding: 'clamp(32px,5vw,56px)',
      }}>
        {/* TOP — headline + subline */}
        <div>
          <AnimSlot
            key="hl"
            text={current.hl}
            fontSize='clamp(30px,5.5vw,62px)'
            fontWeight='700'
            letterSpacing='-0.04em'
            isGradient
          />

          {/* subline */}
          <div style={{ overflow: 'hidden', height: showSub ? 'auto' : 0, marginTop: 12 }}>
            <span style={{
              display: 'block',
              fontSize: 'clamp(13px,1.6vw,16px)',
              fontWeight: 400,
              color: '#6b7280',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              transform: showSub ? 'translateY(0)' : 'translateY(110%)',
              transition: showSub ? `transform 0.8s cubic-bezier(0.16,1,0.3,1)` : 'none',
            }}>
              Agencia · Desarrollo Web · Perú
            </span>
          </div>
        </div>

        {/* BOTTOM — location + brand */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <AnimSlot
            key="loc"
            text={current.loc}
            fontSize='13px'
            fontWeight='400'
            color='#4b5563'
            letterSpacing='0.02em'
            isGradient={false}
          />
          <div style={{
            textAlign: 'right',
            opacity: showBrand ? 1 : 0,
            transition: 'opacity 0.8s ease',
          }}>
            <div style={{
              fontSize: 13, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase',
              background: 'linear-gradient(90deg,#c4b5fd,#7dd3fc)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              Tu Empresa®
            </div>
            <div style={{ fontSize: 11, color: '#374151', marginTop: 3, letterSpacing: '0.04em' }}>
              ©2025
            </div>
          </div>
        </div>
      </div>

      {/* Barra de progreso */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: '#111', zIndex: 20 }}>
        <div style={{
          height: '100%',
          width: `${progress}%`,
          background: 'linear-gradient(90deg,#7c3aed,#a78bfa,#38bdf8)',
          borderRadius: '0 2px 2px 0',
          transition: 'none',
        }} />
      </div>
    </div>
  )
}