import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/MisGrupos.css';

const MisGrupos = () => {
  const navigate = useNavigate();
  const userId = sessionStorage.getItem('id_user'); // Obtener el ID del usuario desde sessionStorage
  const [misGrupos, setMisGrupos] = useState([]); // Estado para los grupos
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error

  useEffect(() => {
    const fetchMisGrupos = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/groups/subscribed/${userId}/`);
        if (!response.ok) {
          throw new Error('Error al obtener los grupos');
        }
        const data = await response.json();
        setMisGrupos(data); // Guardar los grupos en el estado
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMisGrupos();
  }, [userId]);

  const AbandonarGrupo = async (grupoId) => {

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/usergroups/`);
      const data = await response.json()
      // Buscar el userGroupId con ambos parámetros
      const userGroup = data.find((userGroup) => 
        String(userGroup.group) === String(grupoId) && String(userGroup.user) === String(userId)
      );
      if (!userGroup) {
        alert('No se pudo encontrar la relación para abandonar el grupo.');
        return;
      }

      const userGroupId = userGroup.id;
      
      // Hacer la solicitud DELETE al endpoint
      const responseDel = await fetch(`http://127.0.0.1:8000/api/usergroups/${userGroupId}/`, {
        method: 'DELETE',
      });

      if (!responseDel.ok) {
        throw new Error('Error al intentar abandonar el grupo');
      }

      navigate(0)
    } catch (error) {
      console.error('Error al abandonar el grupo:', error);
      alert('Hubo un error al intentar abandonar el grupo');
    }

  }

  return (
    <>
      <Navbar />
      <div className="MisGrupos">
        <div className="title-container">
          <h1>Grupos a los que estás inscrito</h1>
        </div>

        {/* Mostrar mensajes de carga o error */}
        {loading && <div className="mensaje-carga">Cargando...</div>}
        {error && <div className="mensaje-error">Error: {error}</div>}

        {/* Renderizar los grupos */}
        <div className="grupos-container">
          {misGrupos.length > 0 ? (
            misGrupos.map((grupo) => (
              <div className="grupo-item" key={grupo.id}>
                <h2 className="grupo-name">{grupo.name}</h2>
                <div className='botones'>
                  <Link to={`/detalle-grupo/${grupo.id}`} className="btn-ver-detalle">Ver Detalle</Link>
                  <Link className="btn-abandonar"
                    onClick={() => AbandonarGrupo(grupo.id)}
                  > Abandonar Grupo </Link>
                </div>
              </div>
            ))
          ) : (
            !loading && <div className="mensaje-vacio">No estás inscrito en ningún grupo.</div>
          )}
        </div>
      </div>
    </>
  );
};

export default MisGrupos;
