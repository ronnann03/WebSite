import { useState } from 'react'
import IntroScreen from './IntroScreen'
import Navbar       from './components/Navbar'
import Hero         from './components/Hero'
import Services     from './components/Services'
import Portfolio    from './components/Portfolio'
import About        from './components/About'
import Testimonials from './components/Testimonials'
import Contact      from './components/Contact'
import Footer       from './components/Footer'
import './index.css'

export default function App() {
  const [introFinished, setIntroFinished] = useState(false)

  return (
    <>
      {/* Intro animada — desaparece sola al terminar */}
      {!introFinished && (
        <IntroScreen onComplete={() => setIntroFinished(true)} />
      )}

      {/* Sitio principal */}
      <div style={{
        opacity: introFinished ? 1 : 0,
        transition: 'opacity 0.8s ease',
      }}>
        <Navbar />

        <main>
          <Hero />

          {/* Transición oscuro → claro */}
          <div style={{
            height: 120,
            background: 'linear-gradient(to bottom, var(--dark), var(--light))',
          }} />

          <Services />
          <Portfolio />
          <About />
          <Testimonials />
          <Contact />
        </main>

        <Footer />
      </div>
    </>
  )
}
