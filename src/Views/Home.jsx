
import ReactPlayer from 'react-player';

const Home = () => {
  return (
    <div className="flex justify-center items-center">
      <div className=" mt-20 h-44"> {/* Cambia el valor de "w-3/4" para ajustar el ancho deseado */}
        <ReactPlayer  controls={true}  url='http://www.kaltura.com/tiny/gqyrx' />
      </div>
    </div>
  );
}

export default Home;

