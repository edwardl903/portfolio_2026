import { useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
// import Resume from './pages/Resume' // hidden for now – uncomment to show
import Contact from './pages/Contact'
import ContactSuccess from './pages/ContactSuccess'
import Piano from './pages/hobbies/Piano'
import PianoKeyboard from './pages/hobbies/PianoKeyboard'
import Chess from './pages/hobbies/Chess'
import ChessStats from './pages/hobbies/ChessStats'
import Volleyball from './pages/hobbies/Volleyball'
import Skateboarding from './pages/hobbies/Skateboarding'
import Running from './pages/hobbies/Running'
import Hobbies from './pages/hobbies/Hobbies'
import ChessLytics from './pages/projects/ChessLytics'
import ChessLyticsDbt from './pages/projects/ChessLyticsDbt'
import WhoopDebrief from './pages/projects/WhoopDebrief'
import SpotiFriend from './pages/projects/SpotiFriend'
import NlpPipeline from './pages/projects/NlpPipeline'
import MovieRecommendations from './pages/projects/MovieRecommendations'
import Pison from './pages/projects/Pison'
import Fidelity from './pages/projects/Fidelity'
import EEGResearch from './pages/projects/EEGResearch'
import Analytics from './pages/Analytics'
import './styles.css'

function AppRoutes() {
  const location = useLocation()
  const [displayLocation, setDisplayLocation] = useState(location)
  const lastPath = useRef(location.pathname)

  useEffect(() => {
    if (location === displayLocation) return

    // Only cross-fade on a real path change, not hash/search-only updates.
    const samePath = location.pathname === lastPath.current
    lastPath.current = location.pathname

    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    const startViewTransition = document.startViewTransition?.bind(document)

    if (samePath || prefersReduced || !startViewTransition) {
      setDisplayLocation(location) // eslint-disable-line react-hooks/set-state-in-effect
      return
    }

    startViewTransition(() => {
      flushSync(() => setDisplayLocation(location))
    })
  }, [location, displayLocation])

  return (
    <Routes location={displayLocation}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        {/* Resume hidden for now – uncomment to show: <Route path="/resume" element={<Resume />} /> */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/contact-success" element={<ContactSuccess />} />
        <Route path="/hobbies" element={<Hobbies />} />
        <Route path="/hobbies/piano" element={<PianoKeyboard />} />
        <Route path="/hobbies/piano/more" element={<Piano />} />
        <Route path="/hobbies/chess" element={<ChessStats />} />
        <Route path="/hobbies/chess/more" element={<Chess />} />
        <Route path="/hobbies/volleyball" element={<Volleyball />} />
        <Route path="/hobbies/skateboarding" element={<Skateboarding />} />
        <Route path="/hobbies/running" element={<Running />} />
        <Route path="/projects/chesslytics" element={<ChessLytics />} />
        <Route path="/projects/chesslytics-dbt" element={<ChessLyticsDbt />} />
        <Route path="/projects/chesslytics-azure" element={<Navigate to="/projects/chesslytics-dbt" replace />} />
        <Route path="/projects/whoop-debrief" element={<WhoopDebrief />} />
        <Route path="/projects/spotifriend" element={<SpotiFriend />} />
        <Route path="/projects/nlp-pipeline" element={<NlpPipeline />} />
        <Route path="/projects/movie-recommendations" element={<MovieRecommendations />} />
        <Route path="/projects/etl-tools" element={<Pison />} />
        <Route path="/projects/fidelity" element={<Fidelity />} />
        <Route path="/projects/eeg-research" element={<EEGResearch />} />
        <Route path="/analytics" element={<Analytics />} />
    </Routes>
  )
}

function App() {
  return (
    <Layout>
      <AppRoutes />
    </Layout>
  )
}

export default App
