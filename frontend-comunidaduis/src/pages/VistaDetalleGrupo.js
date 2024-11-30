import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../assets/DetalleGrupo.css'
import ImageLogo from '../assets/favicon-comunidaduis.png';

const VistaDetalleGrupo = () => {
  const { id } = useParams(); // Extraemos el id de la URL
  const [grupo, setGrupo] = useState("");

  useEffect((e) => {
    const fetchGrupo = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/groups/${id}/`);
        if (!response.ok) {
          throw new Error('Error al obtener los detalles del grupo');
        }
        const data = await response.json();
        setGrupo(data); // Almacenar los detalles del grupo en el estado
      } catch (e) {
        console.log("Algo salió mal")
      }
    };

    fetchGrupo();
  }, [id]); // Volver a ejecutar cuando el id cambie

  return (
    <div>
      <Navbar></Navbar>
      <div className="detalle-grupo-container">
        <div className="detalle-imagen">
          <img
            src={ImageLogo}
            alt={grupo.name || 'Grupo'}
            className="grupo-imagen"
          />
        </div>
        <div className="detalle-especificaciones">
          <h1>{grupo.name}</h1>
          <p><strong>Descripción:</strong> {grupo.description}</p>
          <p><strong>Horario:</strong> {grupo.schedule}</p>
          <p><strong>Ubicación:</strong> {grupo.location}</p>
          <p><strong>Cupo:</strong> {grupo.quota ? `${grupo.quota} personas` : 'Ilimitado'}</p>
        </div>
      </div>
    </div>
  );
};

export default VistaDetalleGrupo;