import Navbar from '../../components/Navbar';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../../assets/AdminMisGrupos.css'
//Vista de los grupos creados por el administrador
// Vista unicamente de administrador
// Tiene la imagen del grupo, la cantidad de personas y los botontes para consultar los inscritos, editar
// y enviar información a los inscritos (esto es lo del correo pero solo será visual)



const AdminMisGrupos = () => {
  const { id } = useParams(); // Extraemos el id de la URL
  const [grupos, setGrupos] = useState([]);

  useEffect(() => {
    // Función para obtener los grupos desde el API
    const fetchGrupos = async (e) => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/groups/');
        if (!response.ok) {
          throw new Error('Error al obtener los grupos');
        }
        const data = await response.json();

        // Filtrar los grupos por el id del creator
        const dataFiltered = data.filter((grupo) => grupo.creator === parseInt(id, 10));

        setGrupos(dataFiltered); // Almacenar los grupos filtrados en el estado
      } catch (e) {
      }
    };

    fetchGrupos(); // Llamamos a la función para obtener los grupos
  }, [id]); // Ejecutar efecto cuando cambie el id

  function DeleteGroup(groupToDelete) {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este grupo?");
    if (!confirmDelete) return;

    // Llamada al API para eliminar el grupo
    fetch(`http://127.0.0.1:8000/api/groups/${groupToDelete}/`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al eliminar el grupo');
        }
        // Actualizar la lista de grupos después de eliminar
        setGrupos((prevGrupos) => prevGrupos.filter((grupo) => grupo.id !== groupToDelete));
        alert('Grupo eliminado exitosamente');
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Hubo un error al eliminar el grupo');
      });
  }
  return (
    <>
      <Navbar />
      <div className="grupos-list-container">

        <h1 className="grupos-list-title">Grupos creados por ti</h1>
        {grupos.length > 0 ? (
          <div className="grupos-list">
            {grupos.map((grupo) => (
              <div className="grupo-item" key={grupo.id}>
                <h2 className="grupo-name">{grupo.name}</h2>
                <div className="grupo-actions">
                  <Link to={`/detalle-grupo-admin/${grupo.id}`} className='btn'>Detalles</Link>
                  <Link to={`/editar-grupo/${grupo.id}`} className="btn">Editar</Link>
                  <Link onClick={() => DeleteGroup(grupo.id)} className="btn-delete btn">Eliminar</Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-grupos">No hay grupos creados por este usuario</p>
        )}
      </div>
    </>
  );
};
export default AdminMisGrupos;