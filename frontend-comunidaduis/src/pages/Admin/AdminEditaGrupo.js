import Navbar from '../../components/Navbar';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AdminEditaGrupo = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    schedule: '',
    location: '',
    quota: '',
    creator: sessionStorage.getItem('id_user'),
    school: '',
  });

  useEffect((e) => {
    const fetchGrupo = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/groups/${id}/`);
        if (!response.ok) {
          throw new Error('Error al obtener los detalles del grupo');
        }
        const data = await response.json();
        setFormData(data); // Almacenar los detalles del grupo en el estado
      } catch (e) {
        console.log("Algo salió mal")
      }
    };

    fetchGrupo();
  }, [id]); // Volver a ejecutar cuando el id cambie

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
      const response = await fetch(`http://127.0.0.1:8000/api/groups/${id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Convertimos formData a JSON
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el grupo');
      }

      alert('Grupo actualizado exitosamente');
      navigate('/');

    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error al actualizar el grupo');
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

          <button type="submit">Actualizar Grupo</button>
        </form>
      </div>
    </div>
  );

};
export default AdminEditaGrupo;