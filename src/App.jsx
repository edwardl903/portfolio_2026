import { Routes, Route, Navigate } from 'react-router-dom'
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
import ChessLytics from './pages/projects/ChessLytics'
import ChessLyticsDbt from './pages/projects/ChessLyticsDbt'
import SpotiFriend from './pages/projects/SpotiFriend'
import NlpPipeline from './pages/projects/NlpPipeline'
import MovieRecommendations from './pages/projects/MovieRecommendations'
import Pison from './pages/projects/Pison'
import Fidelity from './pages/projects/Fidelity'
import EEGResearch from './pages/projects/EEGResearch'
import Analytics from './pages/Analytics'
import './styles.css'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        {/* Resume hidden for now – uncomment to show: <Route path="/resume" element={<Resume />} /> */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/contact-success" element={<ContactSuccess />} />
        <Route path="/hobbies/piano" element={<PianoKeyboard />} />
        <Route path="/hobbies/piano/more" element={<Piano />} />
        <Route path="/hobbies/chess" element={<ChessStats />} />
        <Route path="/hobbies/chess/more" element={<Chess />} />
        <Route path="/hobbies/volleyball" element={<Volleyball />} />
        <Route path="/hobbies/skateboarding" element={<Skateboarding />} />
        <Route path="/projects/chesslytics" element={<ChessLytics />} />
        <Route path="/projects/chesslytics-dbt" element={<ChessLyticsDbt />} />
        <Route path="/projects/chesslytics-azure" element={<Navigate to="/projects/chesslytics-dbt" replace />} />
        <Route path="/projects/spotifriend" element={<SpotiFriend />} />
        <Route path="/projects/nlp-pipeline" element={<NlpPipeline />} />
        <Route path="/projects/movie-recommendations" element={<MovieRecommendations />} />
        <Route path="/projects/etl-tools" element={<Pison />} />
        <Route path="/projects/fidelity" element={<Fidelity />} />
        <Route path="/projects/eeg-research" element={<EEGResearch />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </Layout>
  )
}

export default App
