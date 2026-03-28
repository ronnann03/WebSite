import { useState } from 'react'
import IntroScreen from './IntroScreen'
import './App.css'

function App() {
  const [introFinished, setIntroFinished] = useState(false)

  return (
    <>
      {!introFinished && (
        <IntroScreen onComplete={() => setIntroFinished(true)} />
      )}

      {/* Tu sitio real va aquí — solo se ve cuando termina la intro */}
      <section style={{ opacity: introFinished ? 1 : 0, transition: 'opacity 0.8s ease' }}>
        <h1>Tu sitio web</h1>
        <p>Contenido de tu empresa aquí.</p>
      </section>
    </>
  )
}

export default App