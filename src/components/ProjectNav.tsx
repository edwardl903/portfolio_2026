import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PROJECT_LIST } from '../data/projects'

interface ProjectNavProps {
  currentId: string
}

function ProjectNav({ currentId }: ProjectNavProps) {
  const navigate = useNavigate()
  const total = PROJECT_LIST.length
  const currentIndex = PROJECT_LIST.findIndex((p) => p.id === currentId)

  if (currentIndex === -1) return null

  const isFirst = currentIndex === 0
  const prevIndex = currentIndex - 1
  const nextIndex = (currentIndex + 1) % total
  const prev = isFirst ? null : PROJECT_LIST[prevIndex]
  const next = PROJECT_LIST[nextIndex]
  const position = currentIndex + 1

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return
      if (e.key === 'ArrowLeft' && prev) navigate(prev.to)
      if (e.key === 'ArrowRight') navigate(next.to)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [navigate, prev, next.to])

  return (
    <nav className="proj-nav" aria-label="Project navigation">
      {prev ? (
        <Link to={prev.to} className="proj-nav-item proj-nav-prev">
          <span className="proj-nav-arrow" aria-hidden="true">←</span>
          <span className="proj-nav-content">
            <span className="proj-nav-label">Previous</span>
            <span className="proj-nav-title">{prev.title}</span>
          </span>
        </Link>
      ) : (
        <div />
      )}

      <Link to="/projects" className="proj-nav-index" aria-label="All projects">
        <span className="proj-nav-count">{position} / {total}</span>
        <span className="proj-nav-all">All projects</span>
      </Link>

      <Link to={next.to} className="proj-nav-item proj-nav-next">
        <span className="proj-nav-content">
          <span className="proj-nav-label">Next</span>
          <span className="proj-nav-title">{next.title}</span>
        </span>
        <span className="proj-nav-arrow" aria-hidden="true">→</span>
      </Link>
    </nav>
  )
}

export default ProjectNav
