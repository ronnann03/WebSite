const testimonials = [
  {
    text: '"Superaron todas mis expectativas. El sitio quedó increíble y lo entregaron antes del plazo. Definitivamente los recomiendo."',
    name: 'María Ríos',
    role: 'CEO · Boutique Lima',
    initials: 'MR',
    grad: 'linear-gradient(135deg,#7c3aed,#2563eb)',
  },
  {
    text: '"Profesionalismo al 100%. Entendieron exactamente lo que necesitábamos y lo ejecutaron a la perfección. El resultado fue mejor de lo esperado."',
    name: 'Carlos Paredes',
    role: 'Fundador · TechStartup',
    initials: 'CP',
    grad: 'linear-gradient(135deg,#0f6e56,#1d9e75)',
  },
  {
    text: '"La app de reservas transformó nuestro negocio. Ahora manejamos el doble de clientes con la mitad del esfuerzo. Una inversión que valió la pena."',
    name: 'Ana Villanueva',
    role: 'Gerente · Restaurante El Mirador',
    initials: 'AV',
    grad: 'linear-gradient(135deg,#185fa5,#38bdf8)',
  },
]

function TestiCard({ text, name, role, initials, grad }) {
  return (
    <div style={{
      background: 'var(--light)', borderRadius: 16, padding: 32,
      border: '0.5px solid var(--light3)',
    }}>
      <div style={{ color: '#f59e0b', fontSize: 14, marginBottom: 16, letterSpacing: 2 }}>
        ★★★★★
      </div>
      <p style={{
        fontSize: 15, color: 'var(--text-light2)',
        lineHeight: 1.7, marginBottom: 24, fontStyle: 'italic',
      }}>{text}</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 40, height: 40, borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: grad,
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 14, fontWeight: 700, color: '#fff',
        }}>{initials}</div>
        <div>
          <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-light)' }}>{name}</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{role}</div>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  return (
    <section id="testimonials" style={{ background: 'var(--light2)', padding: '100px 6%' }}>
      <div className="section-tag">Lo que dicen</div>
      <h2 className="section-title">Clientes que<br />confían en nosotros</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))',
        gap: 20, marginTop: 64,
      }}>
        {testimonials.map(t => <TestiCard key={t.name} {...t} />)}
      </div>
    </section>
  )
}