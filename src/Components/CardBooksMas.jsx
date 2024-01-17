import  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getallbooks } from '../Redux/Actions';
import { Link } from 'react-router-dom';
import Loading from './Loading';

function CardBooksMas() {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books);

  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Define un punto de corte para dispositivos móviles

  useEffect(() => {
    dispatch(getallbooks());
     // Iniciar el temporizador de 3 segundos
     const timer = setTimeout(() => {
      setIsLoading(false); // Después de 3 segundos, establecemos isLoading en falso
    }, 3000); // Retraso de 3000 milisegundos (3 segundos)

  
    return () => clearTimeout(timer);
  }, [dispatch]);


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className={isMobile ? "sm:flex-col" : "md:flex"}>
          {books.map((book) => (
            <div key={book.id} className={`w-${isMobile ? 'full' : '1/3'} p-4`}>
              <div className="w-[300px] mt-28 bg-white shadow-xl rounded-xl overflow-hidden">
                <img src={book.imagen} alt={book.nombre} className="w-full h-[200px] " />
                <div className="p-4">
                  <h2 className="text-xl font-custom font-semibold mb-2">{book.nombre}</h2>
                  <p className="text-gray-700 font-custom">{book.descripcion}</p>
                  <div className="flex justify-between items-center mt-4">
                  <Link to={`/book/${book.id}`}>
                      <button
                        className="font-bold bg-bgla hover:bg-blue-600    shadow-md shadow-blue-600  text-white font-bold py-2 px-4 rounded-full"
                      >
                        ComprarAL
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CardBooksMas;
