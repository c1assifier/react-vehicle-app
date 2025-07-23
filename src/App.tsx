import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home/Home';
import EditVehiclePage from './pages/EditVehiclePage/EditVehiclePage';
import MapPage from './pages/MapPage/MapPage';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vehicles/:id/edit" element={<EditVehiclePage />} />
        <Route path="/map" element={<MapPage />} />
      </Routes>
    </HashRouter>
  );
}
