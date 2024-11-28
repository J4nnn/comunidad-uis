import Navbar from '../components/Navbar';

const HomeDescubreGrupos = () => {
return (
    <div className="App">
      <div>
      <Navbar />
      </div>
      <div className="title-container"> 
        <h1>Puede ser de tu interés</h1>
      </div>

      <div className="grupos-container">
        <div className="grupo-item">Ajedrez</div>
        <div className="grupo-item">Debate</div>
        <div className="grupo-item">Fútbol</div>
        <div className="grupo-item">Ciencias</div>
      </div>
    </div>
  );
};
export default HomeDescubreGrupos;

