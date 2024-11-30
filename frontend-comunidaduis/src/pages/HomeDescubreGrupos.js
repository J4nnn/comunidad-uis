import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const HomeDescubreGrupos = () => {
  const navigate = useNavigate();
  // Estado para almacenar los grupos
  const [grupos, setGrupos] = useState([]);
  const [loading, setLoading] = useState(true); // Para manejar el estado de carga
  const [error, setError] = useState(null); // Para manejar errores

  // Usamos useEffect para hacer la solicitud al API cuando el componente se monte
  useEffect(() => {
    // Función para obtener los grupos desde el API
    const fetchGrupos = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/groups/');
        if (!response.ok) {
          throw new Error('Error al obtener los grupos');
        }
        const data = await response.json();
        setGrupos(data); // Almacenar los grupos en el estado
      } catch (error) {
        setError(error.message); // Si hay error, guardamos el mensaje
      } finally {
        setLoading(false); // Terminamos de cargar
      }
    };

    fetchGrupos(); // Llamamos a la función para obtener los grupos
  }, []); // El array vacío asegura que esto solo se ejecute una vez al montar el componente

  function goToDetalle(grupoId) {
    navigate(`/detalle-grupo/${grupoId}`);
  };
  return (
    <div className="App">
      <div>
        <Navbar />
      </div>
      <div className="title-container">
        <h1>Puede ser de tu interés</h1>
      </div>

      {/* Mostrar mensaje de carga o error */}
      {loading && <div>Cargando...</div>}
      {error && <div>Error: {error}</div>}

      <div className="grupos-container-home">
        {/* Renderizar los grupos si están disponibles */}
        {grupos.length > 0 ? (
          grupos.map((grupo) => (
            <div 
              className="grupo-item-home" 
              key={grupo.id} 
              onClick={() => goToDetalle(grupo.id)} // Pasar el id del grupo
              style={{cursor: 'pointer'}} // Añadir estilo de cursor para indicar que es un botón
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
