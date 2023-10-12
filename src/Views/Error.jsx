
import { Link } from 'react-router-dom';
import logogira from '../img/logosinfondo.png';

function Error() {
  return (
    <div className="h-screen flex flex-col justify-center items-center  text-white">
      <div className="mt-8">
        <img src={logogira} alt="imagen" className="w-44 h-44 animate-spin-slow" />
      </div>
      <div className="text-3xl text-red-500 font-bold text-center">
        ¡Ocurrió un error al procesar tu compra!
      </div>
      <div className="mt-8">
        <Link to="/" className="bg-bgla hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Ir al Inicio
        </Link>
      </div>
    </div>
  );
}

export default Error;
