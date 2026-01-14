import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import '../../assets/AdminNuevoGrupo.css';
import { useNavigate, useParams } from 'react-router-dom';

const AdminCrearAviso = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [description, setDescription] = useState('');
  const [creationDate, setCreationDate] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [message, setMessage] = useState(''); // Mensaje para mostrar el resultado

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear el objeto con los datos del formulario
    const avisoData = {
      description,
      creation_date: creationDate,
      expiration_date: expirationDate,
      publisher: sessionStorage.getItem('id_user'),
      group: parseInt(id),
    };

    try {
      console.log(avisoData); // Log para verificar los datos antes de enviar
      const response = await fetch('http://127.0.0.1:8000/api/announcements/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(avisoData), // Convertir el objeto a JSON
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error en la respuesta:', errorData);
        throw new Error('Error al crear el aviso');
      }

      setMessage('Aviso creado exitosamente');
      // Limpiar los campos después de enviar el formulario
      setDescription('');
      setCreationDate('');
      setExpirationDate('');
      navigate(`/detalle-grupo-admin/${parseInt(id)}`);
    } catch (error) {
      console.error('Error en el envío:', error);
      setMessage('Hubo un error al crear el aviso');
    }
  };

  return (
    <div className="App">
      <Navbar />
      <div className="nuevo-grupo-container">
        <h1>Crear Aviso</h1>
        <form onSubmit={handleSubmit} className="nuevo-grupo-form">
          <div className="form-group">
            <label htmlFor="description">
              Descripción
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="creationDate">
              Fecha de Creación
              <input
                type="date"
                id="creationDate"
                value={creationDate}
                onChange={(e) => setCreationDate(e.target.value)}
                required
              />
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="expirationDate">
              Fecha de Expiración
              <input
                type="date"
                id="expirationDate"
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
                required
              />
            </label>
          </div>
          <button type="submit" className="button">
            Crear Aviso
          </button>
        </form>

        {/* Mostrar el mensaje de éxito o error */}
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default AdminCrearAviso;
