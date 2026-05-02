import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/public/LandingPage'
import HotelsPage from './pages/public/HotelsPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/hotels" element={<HotelsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App