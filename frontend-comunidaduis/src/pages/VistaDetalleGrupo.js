import Navbar from "../components/Navbar";
// Aqui aparece la vista detallada del grupo, con la imagen, la descripcion, 
// los horarios y el boton de "suscribirse" o "unirse al grupo"

const VistaDetalleGrupo = () =>{
    return(
    <div className="VistaDetalleGrupo">
      <div>
      <Navbar />
      </div>
      <div className="title-container"> 
        <h1>Nombre del GRUPO</h1>
      </div>
    </div>
    );
} ;
export default VistaDetalleGrupo