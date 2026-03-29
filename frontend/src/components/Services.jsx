const services = [
  {
    icon: '🎨',
    name: 'Diseño UI/UX',
    desc: 'Interfaces atractivas y funcionales centradas en la experiencia del usuario. Wireframes, prototipos y diseño final.',
    tags: ['Figma', 'Prototipado', 'UX Research'],
  },
  {
    icon: '⚡',
    name: 'Desarrollo Frontend',
    desc: 'Sitios y aplicaciones web rápidas, responsivas y accesibles con las tecnologías más modernas del mercado.',
    tags: ['React', 'Next.js', 'Tailwind'],
  },
  {
    icon: '🔧',
    name: 'Desarrollo Backend',
    desc: 'APIs robustas, bases de datos optimizadas y arquitecturas escalables para proyectos de cualquier tamaño.',
    tags: ['Node.js', 'Express', 'PostgreSQL'],
  },
  {
    icon: '🚀',
    name: 'Soluciones Full Stack',
    desc: 'Proyectos completos de principio a fin: diseño, desarrollo, deploy y mantenimiento continuo.',
    tags: ['Full Stack', 'Deploy', 'Mantenimiento'],
  },
]

function ServiceCard({ icon, name, desc, tags }) {
  return (
    <div style={{
      background: 'var(--light)',
      padding: '40px 36px',
      position: 'relative', overflow: 'hidden',
      transition: 'background 0.3s',
      cursor: 'default',
    }}
      onMouseEnter={e => {
        e.currentTarget.style.background = 'var(--light2)'
        e.currentTarget.querySelector('.top-bar').style.transform = 'scaleX(1)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'var(--light)'
        e.currentTarget.querySelector('.top-bar').style.transform = 'scaleX(0)'
      }}
    >
      {/* top accent bar */}
      <div className="top-bar" style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: 'linear-gradient(135deg,#7c3aed,#2563eb)',
        transform: 'scaleX(0)', transformOrigin: 'left',
        transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)',
      }} />

      <div style={{
        width: 44, height: 44, borderRadius: 10,
        background: 'linear-gradient(135deg,rgba(124,58,237,0.1),rgba(37,99,235,0.1))',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 24, fontSize: 20,
      }}>{icon}</div>

      <div style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: 20, fontWeight: 600,
        color: 'var(--text-light)', letterSpacing: '-0.02em', marginBottom: 12,
      }}>{name}</div>

      <div style={{ fontSize: 14, color: 'var(--text-light2)', lineHeight: 1.7 }}>{desc}</div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 20 }}>
        {tags.map(t => (
          <span key={t} style={{
            fontSize: 11, padding: '4px 10px', borderRadius: 100,
            background: 'rgba(124,58,237,0.08)', color: 'var(--accent3)',
            fontWeight: 500, letterSpacing: '0.02em',
          }}>{t}</span>
        ))}
      </div>
    </div>
  )
}

export default function Services() {
  return (
    <section id="services" style={{ background: 'var(--light)', padding: '100px 6%' }}>
      <div className="section-tag">Lo que hacemos</div>
      <h2 className="section-title">Servicios que<br />transforman ideas</h2>
      <p className="section-sub">
        Soluciones digitales completas, desde el diseño hasta el desarrollo y despliegue.
      </p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))',
        gap: 2,
        background: '#e0ddd6',
      }}>
        {services.map(s => <ServiceCard key={s.name} {...s} />)}
      </div>
    </section>
  )
}
