import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import '../../assets/AdminNuevoGrupo.css'

const AdminCrearAviso = () => {
  // Estado para almacenar los valores del formulario
  const [cover, setCover] = useState('');
  const [description, setDescription] = useState('');
  const [creationDate, setCreationDate] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [publisher, setPublisher] = useState(0); // Cambiar según el ID del usuario
  const [group, setGroup] = useState(0); // Cambiar según el grupo
  const [message, setMessage] = useState(''); // Mensaje para mostrar el resultado

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear el objeto con los datos del formulario
    const avisoData = {
      cover,
      description,
      creation_date: creationDate,
      expiration_date: expirationDate,
      publisher,
      group,
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/announcements/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(avisoData),
      });

      if (!response.ok) {
        throw new Error('Error al crear el aviso');
      }

      const data = await response.json();
      setMessage('Aviso creado exitosamente');
      // Limpiar los campos después de enviar el formulario
      setCover('');
      setDescription('');
      setCreationDate('');
      setExpirationDate('');
    } catch (error) {
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
            <label htmlFor='Nombre'>Nombre: 
            <input
              type="text"
              id="Nombre"
              value={cover}
              onChange={(e) => setCover(e.target.value)}
              required
            />
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="description">Descripción
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="creationDate">Fecha de Creación
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
            <label htmlFor="expirationDate">Fecha de Expiración
            <input
              type="date"
              id="expirationDate"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
              required
            />
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="publisher">ID del Publicante
            <input
              type="number"
              id="publisher"
              value={publisher}
              onChange={(e) => setPublisher(parseInt(e.target.value))}
              required
            />
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="group">ID del Grupo
            <input
              type="number"
              id="group"
              value={group}
              onChange={(e) => setGroup(parseInt(e.target.value))}
              required
            />
            </label>
          </div>

          <button type="submit" className="button">Crear Aviso</button>
        </form>

        {/* Mostrar el mensaje de éxito o error */}
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default AdminCrearAviso;
