import Navbar from "../components/Navbar";
import '../assets/AcercaDe.css';
import ImageLogo from '../assets/favicon-comunidaduis.png'
const AcercaDe = () => {

    return (
        <>
            <Navbar></Navbar>

            <div className="align-center">
                <div className="columns">
                <img
                    src={ImageLogo}
                    alt={'Logo'}
                    className="grupo-imagen"
                />
                </div>
                <div className="columns align-center">
                <p>"Comunidad UIS" es una plataforma diseñada para centralizar y facilitar el acceso a los grupos
                    de esparcimiento de la Universidad Industrial de Santander. Su propósito es ofrecer un espacio donde
                    los miembros de la comunidad UIS puedan descubrir grupos afines a sus intereses, unirse a ellos,
                    participar en sus actividades programadas y conectarse con personas que compartan sus gustos. Además,
                    busca promover el bienestar y el equilibrio entre la vida académica y el disfrute personal,
                    contribuyendo a que la experiencia universitaria sea más enriquecedora y llevadera. </p>

                <h4>Desarrolladores:</h4>
                <ul>
                    <li>Fabiana Acuña</li>
                    <li>Janer Vega</li>
                </ul>


                <p>Fecha de desarrollo: Noviembre 2024</p>
                </div>
                
            </div>
        </>
    );
};

export default AcercaDe