import Navbar from '../../components/Navbar';

//Vista de los grupos creados por el administrador
// Vista unicamente de administrador
// Tiene la imagen del grupo, la cantidad de personas y los botontes para consultar los inscritos, editar
// y enviar información a los inscritos (esto es lo del correo pero solo será visual)



const AdminMisGrupos = () => {
return (
    <div className="App">
      <div>
      <Navbar />
      </div>

      <p>Mis grupos como admin</p>
    </div>
  );
};
export default AdminMisGrupos;