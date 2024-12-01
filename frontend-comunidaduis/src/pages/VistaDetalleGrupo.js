import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../assets/DetalleGrupo.css';
import ImageLogo from '../assets/favicon-comunidaduis.png';

const VistaDetalleGrupo = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { id } = useParams(); // Extraemos el id del grupo desde la URL
  const [grupo, setGrupo] = useState("");
  const userId = parseInt(sessionStorage.getItem('id_user'), 10); // Obtener el ID del usuario desde sessionStorage
  const [inscrito, setInscrito] = useState(false); // Estado para manejar si el usuario ya está inscrito

  useEffect(() => {

    if (sessionStorage.getItem('usertype') != null) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    const fetchGrupo = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/groups/${id}/`);
        if (!response.ok) {
          throw new Error('Error al obtener los detalles del grupo');
        }
        const data = await response.json();
        setGrupo(data); // Almacenar los detalles del grupo en el estado
      } catch (e) {
        console.log("Algo salió mal");
      }
    };

    const verificarInscripcion = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/usergroups/`);
        if (!response.ok) {
          throw new Error('Error al verificar la inscripción');
        }
        const data = await response.json();

        // Comprobar si el usuario ya está inscrito en este grupo
        const estaInscrito = data.some(
          (inscripcion) => inscripcion.user === userId && inscripcion.group === parseInt(id, 10)
        );

        setInscrito(estaInscrito);
      } catch (error) {
        console.error('Error al verificar la inscripción:', error);
      }
    };

    fetchGrupo();
    verificarInscripcion();
  }, [id, userId]);

  const handleInscribirse = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/usergroups/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: userId,
          group: parseInt(id, 10),
        }),
      });

      if (!response.ok) {
        throw new Error('Error al inscribirse en el grupo');
      }

      setInscrito(true); // Actualizar el estado para mostrar el estado de inscripción
      alert('Inscripción exitosa');
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error al intentar inscribirse en el grupo');
    }
  };

  return (
    <div>
      <Navbar />
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
          {!inscrito && isLoggedIn ? (
            <button className="btn-inscribirse" onClick={handleInscribirse}>
              Inscríbete aquí
            </button>
          ) : !isLoggedIn ? (
            <p className="inscripcion-exitosa">Por favor, inicia sesión para inscribirte en el grupo.</p>
          ) : (
            <p className="inscripcion-exitosa">¡Ya estás inscrito en este grupo!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VistaDetalleGrupo;
