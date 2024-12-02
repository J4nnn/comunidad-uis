import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import '../assets/Login.css';

const Login = () => {
  const navigate = useNavigate();
  // Estado para el tipo de usuario
  const [userType, setUserType] = useState('Estudiante1');
  // Estado para los datos del usuario
  const [usuario, setUsuario] = useState({ email: "", password: "", name: "" });

  // Función para obtener los valores predeterminados del usuario según el tipo
  const fetchUserData = async (type) => {
    const userMapping = {
      Estudiante1: 1,
      Estudiante2: 2,
      Estudiante3: 3,
      Estudiante4: 4,
      Estudiante5: 5,
      Estudiante6: 6,
      Estudiante7: 7,
      Estudiante8: 8,
      Estudiante9: 9,
      Estudiante10: 10,
      Estudiante11: 11,
      Estudiante12: 12,
      Estudiante13: 13,
      Estudiante14: 14,
      Estudiante15: 15,
      Estudiante16: 16,
      Estudiante17: 17,
      Estudiante18: 18,
    };
    const userId = userMapping[type];
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/users/${userId}/`);
      if (!response.ok) {
        throw new Error(`Error al obtener los datos: ${response.statusText}`);
      }
      const userData = await response.json();

      console.log(userData);
      return userData;
    } catch (error) {
      console.error("Error al obtener los datos del usuario:", error);
      return null;
    }
  };

  // useEffect para cargar los datos del usuario según el tipo
  useEffect(() => {
    const loadUserData = async () => {
      const data = await fetchUserData(userType); // Esperar a que se resuelvan los datos
      setUsuario(data); // Actualizar el estado con los datos obtenidos
    };
    loadUserData();
  }, [userType]); // Se ejecuta cada vez que `userType` cambia

  // Función para manejar los cambios en los campos del formulario
  const setUser = (e) => {
    setUsuario((prevUsuario) => ({
      ...prevUsuario,
      [e.target.name]: e.target.value,
    }));
  };

  // Función de manejo de inicio de sesión
  const handleLogin = (e) => {
    e.preventDefault();

    if (!usuario?.email || !usuario?.password) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    const data = {
      email: usuario.email,
      password: usuario.password,
      id: usuario.id
    };

    if (userType === "Estudiante1") {
      console.log("Este es Janer", data);
    } else {
      console.log("Esta es Fabi", data);
    }

    sessionStorage.setItem('usertype', userType);
    sessionStorage.setItem('id_user', data.id);
    sessionStorage.setItem('name', usuario.name);

    navigate('/');
  };

  return (
    <div>
      <Navbar />
      <div className="login-container">

        <form onSubmit={handleLogin} className="login-form">
          <div className="login-box">
            <div className="login-field">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={usuario.email}
                onChange={setUser}
                placeholder="Ingresa tu email"
              />
            </div>
            <div className="login-field">
              <label htmlFor="password">Contraseña:</label>
              <input
                type="text"
                id="password"
                name="password"
                value={usuario.password}
                onChange={setUser}
                placeholder="Ingresa tu contraseña"
              />
            </div>
            <div className="login-field">
              <label htmlFor="userType">Tipo de Usuario:</label>
              <select
                  id="userType"
                  value={userType}
                  onChange={(e) => setUserType(e.target.value)}
              >
                <option value="Estudiante1">Estudiante1</option>
                <option value="Estudiante2">Estudiante2</option>
                <option value="Estudiante3">Estudiante3</option>
                <option value="Estudiante4">Estudiante4</option>
                <option value="Estudiante5">Estudiante5</option>
                <option value="Estudiante6">Estudiante6</option>
                <option value="Estudiante7">Estudiante7</option>
                <option value="Estudiante8">Estudiante8</option>
                <option value="Estudiante9">Estudiante9</option>
                <option value="Estudiante10">Estudiante10</option>
                <option value="Estudiante11">Estudiante11</option>
                <option value="Estudiante12">Estudiante12</option>
                <option value="Estudiante13">Estudiante13</option>
                <option value="Estudiante14">Estudiante14</option>
                <option value="Estudiante15">Estudiante15</option>
                <option value="Estudiante16">Estudiante16</option>
                <option value="Estudiante17">Estudiante17</option>
                <option value="Estudiante18">Estudiante18</option>
              </select>
            </div>
            <div className="login-field">
              <button type="submit">Iniciar Sesión</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;