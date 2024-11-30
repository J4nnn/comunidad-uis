import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../assets/Navbar.css';

const Navbar = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');

  // Verificamos si el usuario está logueado
  useEffect(() => {
    if (sessionStorage.getItem('usertype') != null) {
      setIsLoggedIn(true);
      setUserName(sessionStorage.getItem('name'));
      setUserId(sessionStorage.getItem('id_user')); // Suponemos que el ID de usuario se guarda aquí
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // Función para cerrar sesión
  function logout() {
    sessionStorage.clear();
    setIsLoggedIn(false);
  }
  
return (
        <nav>
            <Link to="/">Descubre Grupos</Link>
            {isLoggedIn ? (
                <>
                <Link to={`/mis-grupos/${userId}`}>Mis Grupos</Link>
                <Link to={`/grupos-admin/${userId}`}>Grupos Creados</Link>
                <Link to="/crear-grupo">Nuevo grupo</Link>
                 
                <p className="right-align">{userName}</p>
                <div className="right-align">
                <Link to="/acerca-de">Acerca de</Link>
                <Link onClick={logout} to="/">Cerrar Sesión</Link>
                </div>
                </>
            ) : (
                <div className="right-align">
                <Link to="/acerca-de">Acerca de</Link>
                <Link to="/login">Inicia sesion</Link>
                </div>
            )}
        </nav>
);
};

export default Navbar;