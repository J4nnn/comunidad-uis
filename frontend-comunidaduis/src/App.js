import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeDescubreGrupos from './pages/HomeDescubreGrupos';
import MisGrupos from './pages/MisGrupos';
import Login from './pages/Login';
import VistaDetalleGrupo from './pages/VistaDetalleGrupo';
import AdminCrearAviso from './pages/Admin/AdminCrearAviso';
import AdminMisGrupos from './pages/Admin/AdminMisGrupos';
import AdminNuevoGrupo from './pages/Admin/AdminNuevoGrupo';
import AdminUsuariosInscritos from './pages/Admin/AdminUsuariosInscritos';
import AcercaDe from './pages/AcercaDe';
import AdminEditaGrupo from './pages/Admin/AdminEditaGrupo';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeDescubreGrupos />} />
        <Route path="/mis-grupos/:id" element={<MisGrupos />} />  
        <Route path="/login" element={<Login />} />
        <Route path="/detalle-grupo/:id" element={<VistaDetalleGrupo />} />
        <Route path="/crear-aviso/:id" element={<AdminCrearAviso />} />
        <Route path='/editar-grupo/:id' element={<AdminEditaGrupo />} />  
        <Route path="/grupos-admin/:id" element={<AdminMisGrupos />} />  
        <Route path="/crear-grupo" element={<AdminNuevoGrupo />} />
        <Route path="/usuarios-inscritos" element={<AdminUsuariosInscritos />} />
        <Route path="/acerca-de" element={<AcercaDe />} />
        
      </Routes>
    </Router>
  );
}

export default App;
