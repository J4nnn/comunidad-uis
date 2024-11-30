import React, { useEffect, useState } from "react";
import './Navbar.css';
import { Link } from "react-router-dom";

const Navbar = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [misGruposLink, setMisGruposLink] = useState("");

    useEffect(() => {
      if (sessionStorage.getItem('usertype') != null) {
        setIsLoggedIn(true);
        if (sessionStorage.getItem('usertype') === 'Admin') {
            setIsAdmin(true)
            setMisGruposLink("/grupos-admin");
        }else{
            setMisGruposLink("/mis-grupos");
        }
      } else {
        setIsLoggedIn(false);
      }
      
    }, []);



function logout() {
    sessionStorage.clear();
    setIsLoggedIn(false);
    setIsAdmin(false);
}
return (
        <nav>
            <Link to="/">Descubre Grupos</Link>
            <Link>Escuela</Link>
            {isLoggedIn ? (
                <>
                <Link to={misGruposLink}>Mis Grupos</Link>

                {isAdmin ? (
                    <> 
                    <Link to="/crear-aviso">Crear aviso</Link>
                    <Link to="/crear-grupo">Nuevo grupo</Link>
                    </>
                ) : (
                    <> 
                    </>
                )}
                <p className="right-align">{sessionStorage.getItem('usertype')}</p>
                <Link className="right-align" onClick={logout} to="/">Cerrar Sesión</Link>
                </>
            ) : (
                <>
                <Link className="right-align" to="/login">Inicia sesion</Link>
                </>
            )}
        </nav>
);
};

export default Navbar;