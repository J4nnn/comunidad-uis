import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import '../../assets/AdminNuevoGrupo.css';
import { useNavigate } from 'react-router-dom';

// Creación de grupos (realmente es sencilla la interfaz), lo que necesito son espacios llenados por el admin, 
// como Nombre del grupo, subir una imagen del grupo (como una portada), descripción, horario, ubicación,
// cantidad de cupos, y la escuela a  la que pertence, por ejemplo si es un grupo de debate, puede ser
// de la escuela de derecho 

const AdminNuevoGrupo = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    schedule: '',
    location: '',
    quota: '',
    creator: sessionStorage.getItem('id_user'),
    school: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data for submission
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
      
    }
    try {
      const response = await fetch('http://127.0.0.1:8000/api/groups/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Convertimos formData a JSON
      });

      if (!response.ok) {
        throw new Error('Error al crear el grupo');
      }

      alert('Grupo creado exitosamente');
      navigate('/')
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error al crear el grupo');
    }
  };

  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    useEffect(() => {
      const fetchSchools = async () => {
        try {
          const response = await fetch('http://127.0.0.1:8000/api/schools/');
          if (!response.ok) {
            throw new Error('Error al obtener las escuelas');
          }
          const data = await response.json();
          setSchools(data);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchSchools();
    }, []);

  return (
    <div className="App">
      <Navbar />
      <div className="nuevo-grupo-container">
        <h1>Crear Nuevo Grupo</h1>
        <form onSubmit={handleSubmit} className="nuevo-grupo-form">
          {/* Nombre del grupo */}
          <label>
            Nombre del grupo:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </label>

          {/* Descripción */}
          <label>
            Descripción:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
              required
            ></textarea>
          </label>

          {/* Horario */}
          <label>
            Horario:
            <input
              type="text"
              name="schedule"
              value={formData.schedule}
              onChange={handleInputChange}
              required
            />
          </label>

          {/* Ubicación */}
          <label>
            Ubicación:
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
            />
          </label>

          {/* Cantidad de cupos */}
          <label>
            Cantidad de cupos:
            <input
              type="number"
              name="quota"
              value={formData.quota}
              onChange={handleInputChange}
              min="1"
            />
          </label>

          {/* Escuela */}
          <label>
            Escuela:
            {loading && <p>Cargando escuelas...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && (
              <select
                name="school"
                value={formData.school}
                onChange={handleInputChange}
                required
              >
                <option value="">Selecciona una escuela</option>
                {schools.map((school) => (
                  <option key={school.id} value={school.id}>
                    {school.name}
                  </option>
                ))}
              </select>
            )}
          </label>

          <button type="submit">Crear Grupo</button>
        </form>
      </div>
    </div>
  );
};

export default AdminNuevoGrupo;

