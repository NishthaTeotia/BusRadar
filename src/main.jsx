import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter,Routes,Route} from 'react-router-dom'

import 'leaflet/dist/leaflet.css';

import './index.css'
import App from './App.jsx'
import FrontPage from'./components/FrontPage.jsx'
import BusRoutes from './components/BusRoutes.jsx'
import Map from './components/Map.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<FrontPage/>}/>
      <Route path="/busroutes" element={<BusRoutes/>}/>
      <Route path="/map" element={<Map/>}/>
    </Routes>
    </BrowserRouter>
  
  </StrictMode>,
)
