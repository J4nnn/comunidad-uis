import Navbar from '../../components/Navbar';

// Aquí saldrá la lista de los correos de los usuarios que están inscritos, esto es una pagina que
// sale de darle clic al boton "consultar usuarios inscritos" en un grupo especifico.


const AdminUsuariosInscritos = () => {
return (
    <div className="App">
      <div>
      <Navbar />
      </div>
      <a>Usuarios inscritos</a>

    </div>
  );
};
export default AdminUsuariosInscritos;