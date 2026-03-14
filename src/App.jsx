import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
// import Resume from './pages/Resume' // hidden for now – uncomment to show
import Contact from './pages/Contact'
import ContactSuccess from './pages/ContactSuccess'
import Piano from './pages/hobbies/Piano'
import Chess from './pages/hobbies/Chess'
import Volleyball from './pages/hobbies/Volleyball'
import Skateboarding from './pages/hobbies/Skateboarding'
import ChessLytics from './pages/projects/ChessLytics'
import ChessLyticsAzure from './pages/projects/ChessLyticsAzure'
import SpotiFriend from './pages/projects/SpotiFriend'
import NLPipeline from './pages/projects/NLPipeline'
import MovieRecommendations from './pages/projects/MovieRecommendations'
import ETLTools from './pages/projects/ETLTools'
import EEGResearch from './pages/projects/EEGResearch'
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
        <Route path="/hobbies/piano" element={<Piano />} />
        <Route path="/hobbies/chess" element={<Chess />} />
        <Route path="/hobbies/volleyball" element={<Volleyball />} />
        <Route path="/hobbies/skateboarding" element={<Skateboarding />} />
        <Route path="/projects/chesslytics" element={<ChessLytics />} />
        <Route path="/projects/chesslytics-azure" element={<ChessLyticsAzure />} />
        <Route path="/projects/spotifriend" element={<SpotiFriend />} />
        <Route path="/projects/nlp-pipeline" element={<NLPipeline />} />
        <Route path="/projects/movie-recommendations" element={<MovieRecommendations />} />
        <Route path="/projects/etl-tools" element={<ETLTools />} />
        <Route path="/projects/eeg-research" element={<EEGResearch />} />
      </Routes>
    </Layout>
  )
}

export default App
