import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Login = () =>{
    const navigate = useNavigate();
    const [userType, setUserType] = useState('Admin');
  
    const defaultValues = (type) => {
      return type === 'Estudiante' ?
        {
          correo_electronico: 'user@gmail.com',
          contrasena: 'user123',
        } :
        {
          correo_electronico: 'admin@gmail.com',
          contrasena: 'admin123',
        };
    };
  
    const [usuario, setUsuario] = useState(defaultValues(userType));
  
    useEffect(() => {
      setUsuario(defaultValues(userType));
    }, [userType]);
  
    const { correo_electronico, contrasena } = usuario;
  
    const setUser = (e) => {
      setUsuario({
        ...usuario,
        [e.target.name]: e.target.value,
      });
    };
  
    const Login = async (e) => {
      e.preventDefault();
      if (!correo_electronico || !contrasena) {
        alert('Por favor, complete todos los campos.');
        return;
      }
  
      const data = {
        correo_electronico: usuario.correo_electronico,
        contrasena: usuario.contrasena,
      };
  
      if (userType === "Admin") {
        console.log("esto es un administrador", data)
        sessionStorage.setItem('usertype', userType)
        navigate('/');
      } else {
        console.log("esto es un estudiante", data)
        sessionStorage.setItem('usertype', userType)
        navigate('/');
      }
    };
  
    return (
      <div>
        <Navbar />
        <form onSubmit={Login} className="form">
          <h2>Login</h2> {/* Título agregado */}
          <div>
            <label>Correo electronico:</label>
            <input
              type="email"
              name='correo_electronico'
              value={correo_electronico}
              onChange={setUser}
              required
            />
          </div>
          <div>
            <label>Contraseña:</label>
            <input
              type="text"
              name='contrasena'
              value={contrasena}
              onChange={setUser}
              required
            />
          </div>
          <div>
            <label>Tipo de Usuario:</label>
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
            >
              <option value="Admin">Admin</option>
              <option value="Estudiante">Estudiante</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
      </div>
    );
};

export default Login;