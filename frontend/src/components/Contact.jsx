import { useState } from 'react'

const contactDetails = [
  { icon: '✉', label: 'Email', value: 'hola@devstudio.pe', sub: 'Escríbenos cuando quieras' },
  { icon: '📍', label: 'Ubicación', value: 'Ancash, Perú', sub: 'Trabajamos con clientes en todo el mundo' },
  { icon: '⏱', label: 'Horario', value: 'Lun – Vie · 9am – 6pm', sub: 'Tiempo de respuesta: <24h' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', project: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aquí conectas con tu backend: fetch('/api/contact', { method:'POST', body: JSON.stringify(form) })
    setSent(true)
    setTimeout(() => setSent(false), 4000)
    setForm({ name: '', email: '', project: '', message: '' })
  }

  const inputStyle = {
    width: '100%', padding: '14px 18px',
    background: 'rgba(255,255,255,0.05)',
    border: '0.5px solid rgba(255,255,255,0.1)',
    borderRadius: 10, color: 'var(--text-dark)',
    fontFamily: "'DM Sans', sans-serif", fontSize: 15,
    outline: 'none', transition: 'border-color 0.2s',
  }

  return (
    <section id="contact" style={{
      background: 'var(--dark)', padding: '100px 6%',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: 80, alignItems: 'start',
      }} className="contact-inner">

        {/* Info */}
        <div>
          <div style={{
            fontSize: 12, fontWeight: 600, letterSpacing: '0.1em',
            textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 16,
          }}>Trabajemos juntos</div>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(32px,5vw,52px)', fontWeight: 700,
            letterSpacing: '-0.03em', color: 'var(--text-dark)',
            lineHeight: 1.1, marginBottom: 16,
          }}>¿Tienes un<br />proyecto en mente?</h2>
          <p style={{
            fontSize: 16, color: 'var(--text-dark2)',
            maxWidth: 400, lineHeight: 1.65, marginBottom: 40,
          }}>
            Cuéntanos tu idea. Respondemos en menos de 24 horas.
          </p>

          {contactDetails.map(d => (
            <div key={d.label} style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: 'rgba(167,139,250,0.1)',
                border: '0.5px solid rgba(167,139,250,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 16, flexShrink: 0,
              }}>{d.icon}</div>
              <div>
                <div style={{ fontSize: 15, color: 'var(--text-dark)', fontWeight: 500 }}>{d.value}</div>
                <div style={{ fontSize: 13, color: 'var(--text-dark2)' }} dangerouslySetInnerHTML={{ __html: d.sub }} />
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {[
            { key: 'name',    label: 'Nombre',   type: 'text',  placeholder: 'Tu nombre completo' },
            { key: 'email',   label: 'Email',    type: 'email', placeholder: 'tu@email.com' },
            { key: 'project', label: 'Proyecto', type: 'text',  placeholder: '¿Qué tipo de proyecto tienes?' },
          ].map(f => (
            <div key={f.key} style={{ marginBottom: 20 }}>
              <label style={{
                display: 'block', fontSize: 12, color: 'var(--text-dark2)',
                letterSpacing: '0.04em', textTransform: 'uppercase',
                marginBottom: 8, fontWeight: 500,
              }}>{f.label}</label>
              <input
                type={f.type}
                placeholder={f.placeholder}
                value={form[f.key]}
                onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = 'rgba(167,139,250,0.5)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
            </div>
          ))}

          <div style={{ marginBottom: 20 }}>
            <label style={{
              display: 'block', fontSize: 12, color: 'var(--text-dark2)',
              letterSpacing: '0.04em', textTransform: 'uppercase',
              marginBottom: 8, fontWeight: 500,
            }}>Mensaje</label>
            <textarea
              rows={4}
              placeholder="Cuéntanos tu idea..."
              value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
              style={{ ...inputStyle, resize: 'none' }}
              onFocus={e => e.target.style.borderColor = 'rgba(167,139,250,0.5)'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
            />
          </div>

          <button type="submit" style={{
            width: '100%', padding: 15, borderRadius: 100,
            background: 'linear-gradient(135deg,#7c3aed,#2563eb)',
            color: '#fff', border: 'none',
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 15, fontWeight: 600, cursor: 'pointer',
            letterSpacing: '0.02em',
            transition: 'opacity 0.2s, transform 0.2s',
          }}
            onMouseEnter={e => { e.target.style.opacity = '0.85'; e.target.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.target.style.opacity = '1'; e.target.style.transform = 'translateY(0)' }}
          >
            {sent ? '✓ Mensaje enviado' : 'Enviar mensaje →'}
          </button>
        </form>
      </div>
    </section>
  )
}