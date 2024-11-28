import React from "react";
import './Navbar.css';

const Navbar = () => {

return (
        <nav>
            <a>Descubre Grupos</a>
            <a href="/MisGrupos.js">Mis Grupos</a>
            <a>Escuela</a>
            <a class="right-align">Usuario</a>
        </nav>
);
};

export default Navbar;