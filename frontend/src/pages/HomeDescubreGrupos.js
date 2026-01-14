import React from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { useQuery } from '@tanstack/react-query';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const HomeDescubreGrupos = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const userId = user?.id ? parseInt(user.id, 10) : null;

  const { data: grupos = [], isLoading, error } = useQuery({
    queryKey: ['groups'],
    queryFn: async () => {
      const response = await api.get('/groups/');
      return response.data;
    },
    select: (data) => data.filter((grupo) => grupo.creator !== userId),
  });

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

      {isLoading && <div>Cargando...</div>}
      {error && <div>Error: {error.message}</div>}

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
          !isLoading && <div>No hay grupos disponibles.</div>
        )}
      </div>
    </div>
  );
};

export default HomeDescubreGrupos;
