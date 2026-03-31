import { useEffect, useRef } from 'react'

function ThreeBackground() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const isMobile = window.innerWidth < 768
    const COLS = isMobile ? 10 : 18
    const ROWS = isMobile ? 6  : 10

    let cleanup = null

    import('three').then(THREE => {
      const W = mount.offsetWidth
      const H = mount.offsetHeight

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setSize(W, H)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setClearColor(0x050507, 1)
      mount.appendChild(renderer.domElement)

      const scene  = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 100)
      camera.position.z = 5

      const meshes = [], origins = []
      const geo = new THREE.SphereGeometry(0.06, 8, 8)
      const baseMat = new THREE.MeshBasicMaterial({ color: 0xa78bfa, transparent: true, opacity: 0.55 })

      for (let i = 0; i < COLS; i++) {
        for (let j = 0; j < ROWS; j++) {
          const m = new THREE.Mesh(geo, baseMat.clone())
          const x = (i / (COLS - 1) - 0.5) * 14
          const y = (j / (ROWS - 1) - 0.5) * 7
          m.position.set(x, y, 0)
          origins.push({ x, y })
          scene.add(m)
          meshes.push(m)
        }
      }

      const lineMat = new THREE.LineBasicMaterial({ color: 0x7c3aed, transparent: true, opacity: 0.14 })
      for (let i = 0; i < meshes.length; i++) {
        for (let j = i + 1; j < meshes.length; j++) {
          const dx = origins[i].x - origins[j].x
          const dy = origins[i].y - origins[j].y
          if (Math.sqrt(dx * dx + dy * dy) < 1.2) {
            const g = new THREE.BufferGeometry().setFromPoints([meshes[i].position.clone(), meshes[j].position.clone()])
            scene.add(new THREE.Line(g, lineMat))
          }
        }
      }

      let mx = 0, my = 0, autoT = 0, raf
      const clock = new THREE.Clock()

      const onMove = (e) => {
        const r = mount.getBoundingClientRect()
        mx = ((e.clientX - r.left) / W) * 2 - 1
        my = -((e.clientY - r.top)  / H) * 2 + 1
      }
      mount.addEventListener('mousemove', onMove)

      function animate() {
        raf = requestAnimationFrame(animate)
        const t = clock.getElapsedTime()
        if (isMobile) {
          autoT += 0.004
          mx = Math.sin(autoT) * 0.4
          my = Math.cos(autoT * 0.7) * 0.3
        }
        meshes.forEach((m, i) => {
          const o = origins[i]
          const wave = Math.sin(t * 0.8 + o.x * 0.4 + o.y * 0.4) * 0.18
          const dx = mx * 3 - o.x, dy = my * 2 - o.y
          const pull = Math.max(0, 1 - Math.sqrt(dx*dx+dy*dy) / 4) * 0.4
          m.position.z = wave + pull * Math.sin(t * 1.5)
          m.position.x = o.x + mx * 0.08
          m.position.y = o.y + my * 0.05
          m.material.opacity = 0.3 + pull * 0.5
        })
        camera.position.x += (mx * 0.3 - camera.position.x) * 0.05
        camera.position.y += (my * 0.2 - camera.position.y) * 0.05
        camera.lookAt(0, 0, 0)
        renderer.render(scene, camera)
      }
      animate()

      const onResize = () => {
        const nW = mount.offsetWidth, nH = mount.offsetHeight
        renderer.setSize(nW, nH)
        camera.aspect = nW / nH
        camera.updateProjectionMatrix()
      }
      window.addEventListener('resize', onResize)

      cleanup = () => {
        cancelAnimationFrame(raf)
        window.removeEventListener('resize', onResize)
        mount.removeEventListener('mousemove', onMove)
        renderer.dispose()
        if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
      }
    }).catch(() => {
      mount.style.background = '#050507'
    })

    return () => { if (cleanup) cleanup() }
  }, [])

  return <div ref={mountRef} style={{ position: 'absolute', inset: 0, zIndex: 0 }} />
}

const stats = [
  { num: '50+',  label: 'Proyectos entregados' },
  { num: '5+',   label: 'Años de experiencia'  },
  { num: '30+',  label: 'Clientes satisfechos' },
  { num: '100%', label: 'Compromiso total'      },
]

export default function Hero() {
  return (
    <section id="hero" style={{
      minHeight: '100vh',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      padding: 'clamp(100px,14vw,160px) 6% clamp(60px,8vw,100px)',
      position: 'relative', overflow: 'hidden',
      background: '#050507',
    }}>
      <ThreeBackground />

      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(255,255,255,0.008) 3px,rgba(255,255,255,0.008) 4px)',
      }} />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: 900 }}>

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

        <h1 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 'clamp(40px,7vw,88px)',
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

        <p style={{
          fontSize: 'clamp(15px,2vw,20px)', fontWeight: 300,
          color: 'var(--text-dark2)', maxWidth: 540, lineHeight: 1.65, marginBottom: 40,
        }}>
          Creamos experiencias web que combinan diseño impactante con código sólido.
          Desde el concepto hasta el deploy.
        </p>

        <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
          <a href="#portfolio" className="btn-primary">Ver proyectos</a>
          <a href="#contact"   className="btn-ghost">Conversemos</a>
        </div>

        <div className="hero-stats">
          {stats.map(s => (
            <div key={s.label}>
              <div style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(26px,4vw,36px)', fontWeight: 700, letterSpacing: '-0.04em',
                background: 'linear-gradient(135deg,#e8e0ff,#a78bfa,#38bdf8)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>{s.num}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4, letterSpacing: '0.02em' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}