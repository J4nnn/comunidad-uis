import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const HomeDescubreGrupos = () => {
  const navigate = useNavigate();
  const userId = parseInt(sessionStorage.getItem('id_user'), 10); // Obtener el ID del usuario desde sessionStorage

  const [grupos, setGrupos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGrupos = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/groups/');
        if (!response.ok) {
          throw new Error('Error al obtener los grupos');
        }
        const data = await response.json();

        // Filtrar los grupos para excluir aquellos donde el usuario sea el líder (creator)
        const gruposFiltrados = data.filter((grupo) => grupo.creator !== userId);

        setGrupos(gruposFiltrados);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGrupos();
  }, [userId]); // Ejecutar efecto cuando cambie el ID del usuario

  function goToDetalle(grupoId) {
    navigate(`/detalle-grupo/${grupoId}`);
  }

  return (
    <div className="App">
      <div>
        <Navbar />
      </div>
      <div className="title-container">
        <h1>Puede ser de tu interés</h1>
      </div>

      {loading && <div>Cargando...</div>}
      {error && <div>Error: {error}</div>}

      <div className="grupos-container-home">
        {grupos.length > 0 ? (
          grupos.map((grupo) => (
            <div
              className="grupo-item-home"
              key={grupo.id}
              onClick={() => goToDetalle(grupo.id)}
              style={{ cursor: 'pointer' }}
            >
              <h2>{grupo.name}</h2>
            </div>
          ))
        ) : (
          <div>No hay grupos disponibles.</div>
        )}
      </div>
    </div>
  );
};

export default HomeDescubreGrupos;
