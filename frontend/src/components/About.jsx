const projects = [
  {
    num: '01', grad: 'linear-gradient(135deg,#7c3aed,#2563eb)',
    name: 'E-Commerce Platform',
    desc: 'Tienda online completa con panel de administración, pagos integrados y gestión de inventario.',
    stack: ['React', 'Node.js', 'Stripe', 'MongoDB'],
  },
  {
    num: '02', grad: 'linear-gradient(135deg,#0f6e56,#1d9e75)',
    name: 'SaaS Dashboard',
    desc: 'Panel de analíticas en tiempo real con visualización de datos y reportes automatizados.',
    stack: ['Next.js', 'Prisma', 'Chart.js'],
  },
  {
    num: '03', grad: 'linear-gradient(135deg,#993c1d,#d85a30)',
    name: 'App de Reservas',
    desc: 'Sistema de reservas para restaurante con calendario interactivo y notificaciones automáticas.',
    stack: ['React', 'Express', 'PostgreSQL'],
  },
  {
    num: '04', grad: 'linear-gradient(135deg,#185fa5,#38bdf8)',
    name: 'Landing Corporativa',
    desc: 'Sitio web institucional con animaciones avanzadas, SEO optimizado y CMS integrado.',
    stack: ['Next.js', 'Sanity', 'Framer Motion'],
  },
]

function ProjectCard({ num, grad, name, desc, stack }) {
  return (
    <div style={{
      background: 'var(--light)', borderRadius: 16, overflow: 'hidden',
      border: '0.5px solid var(--light3)', cursor: 'pointer',
      transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s',
    }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-6px)'
        e.currentTarget.style.boxShadow = '0 24px 48px rgba(0,0,0,0.1)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Thumbnail */}
      <div style={{
        height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: grad,
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: 48, fontWeight: 700, letterSpacing: '-0.04em',
        color: 'rgba(255,255,255,0.9)',
      }}>{num}</div>

      {/* Info */}
      <div style={{ padding: 24 }}>
        <div style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 18, fontWeight: 600,
          color: 'var(--text-light)', letterSpacing: '-0.02em', marginBottom: 8,
        }}>{name}</div>
        <div style={{ fontSize: 13, color: 'var(--text-light2)', lineHeight: 1.6, marginBottom: 16 }}>
          {desc}
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {stack.map(t => (
            <span key={t} style={{
              fontSize: 11, padding: '3px 10px', borderRadius: 100,
              background: 'var(--light3)', color: 'var(--text-light2)', fontWeight: 500,
            }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Portfolio() {
  return (
    <section id="portfolio" style={{ background: 'var(--light2)', padding: '100px 6%' }}>
      <div className="section-tag">Trabajo reciente</div>
      <h2 className="section-title">Proyectos que<br />hablan por sí solos</h2>
      <p className="section-sub">
        Una selección de los proyectos más recientes y representativos.
      </p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))',
        gap: 24,
      }}>
        {projects.map(p => <ProjectCard key={p.num} {...p} />)}
      </div>
    </section>
  )
}