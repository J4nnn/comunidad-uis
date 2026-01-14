import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import '../assets/Login.css';
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  // Estado para el tipo de usuario
  const [userType, setUserType] = useState('Estudiante1');
  // Estado para los datos del usuario
  const [usuario, setUsuario] = useState({ email: "", password: "", name: "" });

  // Función para obtener los valores predeterminados del usuario según el tipo
  const fetchUserData = async (type) => {
    const userMapping = {
      Estudiante1: 1, Estudiante2: 2, Estudiante3: 3, Estudiante4: 4, Estudiante5: 5,
      Estudiante6: 6, Estudiante7: 7, Estudiante8: 8, Estudiante9: 9, Estudiante10: 10,
      Estudiante11: 11, Estudiante12: 12, Estudiante13: 13, Estudiante14: 14, Estudiante15: 15,
      Estudiante16: 16, Estudiante17: 17, Estudiante18: 18,
    };
    const userId = userMapping[type];
    try {
      const response = await api.get(`/users/${userId}/`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener los datos del usuario:", error);
      return null;
    }
  };

  // useEffect para cargar los datos del usuario según el tipo
  useEffect(() => {
    const loadUserData = async () => {
      const data = await fetchUserData(userType);
      if (data) setUsuario(data);
    };
    loadUserData();
  }, [userType]);

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

    login({
      id: usuario.id,
      name: usuario.name,
      usertype: userType,
    });

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
                value={usuario.email || ''}
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
                value={usuario.password || ''}
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
                {Array.from({ length: 18 }, (_, k) => k + 1).map(i => (
                  <option key={i} value={`Estudiante${i}`}>{`Estudiante${i}`}</option>
                ))}
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