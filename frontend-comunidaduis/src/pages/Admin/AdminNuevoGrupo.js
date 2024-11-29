import Navbar from '../../components/Navbar';

// Creación de grupos (realente es sencilla la interfaz), lo que necesito son espacios llenados por el admin, 
// como Nombre del grupo, subir una imagen del grupo (como una portada), descripción, horario, ubicación,
// cantidad de cupos, y la escuela a  la que pertence, por ejemplo si es un grupo de debate, puede ser
// de la escuela de derecho 



const AdminNuevoGrupo = () => {
return (
    <div className="App">
      <div>
      <Navbar />
      </div>
      <a>crear grupo</a>

    </div>
  );
};
export default AdminNuevoGrupo;