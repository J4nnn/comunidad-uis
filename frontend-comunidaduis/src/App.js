import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeDescubreGrupos from './pages/HomeDescubreGrupos';
import MisGrupos from './pages/MisGrupos';
import Login from './pages/Login';

function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<HomeDescubreGrupos />} />
        <Route path="/mis-grupos" element={<MisGrupos />} />  
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>

  ); 
};

export default App;
