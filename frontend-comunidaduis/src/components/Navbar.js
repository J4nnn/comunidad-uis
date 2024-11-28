import React from "react";
import './Navbar.css';
import { Link } from 'react-router-dom'; 

const Navbar = () => {

return (
        <nav>
            <Link to="/">Descubre Grupos</Link>
            <Link to="/mis-grupos">Mis Grupos</Link>
            <Link>Escuela</Link>
            <Link className="right-align" to="/login">Usuario</Link>
        </nav>
);
};

export default Navbar;