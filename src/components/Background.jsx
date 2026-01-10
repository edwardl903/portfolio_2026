import { useEffect } from 'react'

function Background() {
  useEffect(() => {
    // Create particles
    const createParticles = () => {
      const particlesContainer = document.createElement('div')
      particlesContainer.className = 'particles'
      document.body.appendChild(particlesContainer)
      
      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div')
        particle.className = 'particle'
        particle.style.cssText = `
          position: fixed;
          width: 2px;
          height: 2px;
          background: rgba(139, 92, 246, 0.5);
          border-radius: 50%;
          left: ${Math.random() * 100}vw;
          top: ${Math.random() * 100}vh;
          animation: float-particle ${5 + Math.random() * 10}s linear infinite;
          z-index: -1;
        `
        particlesContainer.appendChild(particle)
      }
    }

    createParticles()
  }, [])

  return (
    <div className="background-animation">
      <div className="grid"></div>
      <div className="particles"></div>
    </div>
  )
}

export default Background

