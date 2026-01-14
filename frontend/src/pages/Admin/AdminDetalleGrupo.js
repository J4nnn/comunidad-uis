import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import '../../assets/DetalleGrupo.css'
import ImageLogo from '../../assets/favicon-comunidaduis.png';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../services/api';

const AdminDetalleGrupo = () => {
    const { id } = useParams();
    const queryClient = useQueryClient();

    // Fetch Group Details
    const { data: grupo = {}, isLoading: isLoadingGrupo } = useQuery({
        queryKey: ['group', id],
        queryFn: async () => {
            const response = await api.get(`/groups/${id}/`);
            return response.data;
        },
    });

    // Fetch Enrolled Users
    const { data: usuariosInscritos = [], isLoading: isLoadingUsers } = useQuery({
        queryKey: ['group-users', id],
        queryFn: async () => {
            const response = await api.get('/usergroups/');
            const userGroups = response.data.filter((ug) => ug.group === parseInt(id));

            const detailedUsers = await Promise.all(
                userGroups.map(async (ug) => {
                    const userResponse = await api.get(`/users/${ug.user}/`);
                    return userResponse.data;
                })
            );
            return detailedUsers;
        },
    });

    // Fetch Announcements
    const { data: avisos = [], isLoading: isLoadingAvisos } = useQuery({
        queryKey: ['group-announcements', id],
        queryFn: async () => {
            const response = await api.get('/announcements/');
            return response.data.filter((aviso) => aviso.group === parseInt(id));
        },
    });

    // Delete Announcement Mutation
    const deleteMutation = useMutation({
        mutationFn: async (idAnnouncement) => {
            await api.delete(`/announcements/${idAnnouncement}/`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['group-announcements', id] });
        },
    });


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
                    <div className='right'>
                        <Link to={`/crear-aviso/${id}`} className="btn">Crear aviso</Link>
                    </div>
                </div>
            </div>

            <div className="avisos">
                <h2>Avisos del Grupo</h2>
                {isLoadingAvisos ? <p>Cargando avisos...</p> : avisos.length > 0 ? (
                    <ul className="lista-avisos">
                        {avisos.map((aviso) => (
                            <li key={aviso.id} className="aviso-item">
                                <p><strong>Descripción:</strong> {aviso.description}</p>
                                <p><strong>Creado el:</strong> {aviso.creation_date}</p>
                                <p><strong>Expira el:</strong> {aviso.expiration_date}</p>
                                <button className='btn-red' onClick={() => deleteMutation.mutate(aviso.id)}>
                                    {deleteMutation.isPending ? 'Borrando...' : 'Borrar aviso'}
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No hay avisos para este grupo.</p>
                )}
            </div>

            <div className="usuarios-inscritos-container">
                <h2>Usuarios inscritos</h2>
                {isLoadingUsers ? <p>Cargando usuarios...</p> : usuariosInscritos.length > 0 ? (
                    <ul className="lista-usuarios">
                        {usuariosInscritos.map((usuario) => (
                            <li key={usuario.id} className="usuario-item">
                                <p><strong>{usuario.username}</strong></p>
                                <p>{usuario.email}</p>
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