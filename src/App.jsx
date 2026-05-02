import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/public/LandingPage'
import HotelsPage from './pages/public/HotelsPage'
import HotelDetailPage from './pages/public/HotelDetailPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/hotels" element={<HotelsPage />} />
        <Route path="/hotels/:id" element={<HotelDetailPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App