import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import '../../assets/DetalleGrupo.css'
import ImageLogo from '../../assets/favicon-comunidaduis.png';

const AdminDetalleGrupo = () => {
    const { id } = useParams(); // Extraemos el id de la URL
    const [grupo, setGrupo] = useState("");
    const [usuariosInscritos, setUsuariosInscritos] = useState([]);

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

        const fetchUsuariosInscritos = async () => {
            try {
                // 1. Obtener todas las relaciones entre usuarios y grupos
                const response = await fetch('http://127.0.0.1:8000/api/usergroups/');
                const data = await response.json();

                // 2. Filtrar los usuarios que están inscritos en el grupo actual
                const usuariosFiltrados = data.filter((userGroup) => userGroup.group === parseInt(id));

                // 3. Para cada usuario, hacer una solicitud para obtener los detalles del usuario
                const usuariosDelGrupo = [];

                // Usamos un bucle for...of para esperar la respuesta de cada solicitud a la API de usuarios
                for (let usuario of usuariosFiltrados) {
                    const userId = usuario.user; // El id del usuario está en el atributo "user"

                    // 4. Hacer la solicitud para obtener los detalles del usuario
                    const userResponse = await fetch(`http://127.0.0.1:8000/api/users/${userId}/`);

                    // Aseguramos que la respuesta sea correcta
                    if (!userResponse.ok) {
                        throw new Error('Error al obtener los detalles del usuario');
                    }

                    const userData = await userResponse.json(); // Obtener los datos del usuario

                    // 5. Guardamos los datos del usuario en el array
                    usuariosDelGrupo.push(userData); // Agregamos el detalle del usuario al array
                }

                // 6. Finalmente, almacenamos los usuarios en el estado
                setUsuariosInscritos(usuariosDelGrupo);
            } catch (e) {
                console.log('Error al obtener los usuarios inscritos');
            }
        };

        fetchGrupo();
        fetchUsuariosInscritos();
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
            {/* Mostrar la lista de usuarios inscritos */}
            <div className="usuarios-inscritos-container">
                <h2>Usuarios inscritos</h2>
                {usuariosInscritos.length > 0 ? (
                    <ul className="lista-usuarios">
                        {usuariosInscritos.map((usuario) => (
                            <li key={usuario.id} className="usuario-item">
                                {/* Renderiza la información del usuario */}
                                <p><strong>{usuario.username}</strong></p>
                                <p>{usuario.email}</p> {/* Puedes agregar más campos según lo que quieras mostrar */}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No hay usuarios inscritos en este grupo.</p>
                )}
            </div>
        </div>
    );
};

export default AdminDetalleGrupo;