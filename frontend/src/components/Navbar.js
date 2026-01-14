import React from "react";
import { Link } from "react-router-dom";
import '../assets/Navbar.css';
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const isLoggedIn = !!user;

  return (
    <nav>
      <Link to="/">Descubre Grupos</Link>
      {isLoggedIn ? (
        <>
          <Link to={`/mis-grupos/${user.id}`}>Mis Grupos</Link>
          <Link to={`/grupos-admin/${user.id}`}>Grupos Creados</Link>
          <Link to="/crear-grupo">Nuevo grupo</Link>

          <p className="right-align">{user.name}</p>
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