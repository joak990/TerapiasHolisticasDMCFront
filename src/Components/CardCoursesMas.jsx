import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getallcourses } from '../Redux/Actions';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Loading from './Loading';

function CardCoursesMas() {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Define un punto de corte para dispositivos móviles

  useEffect(() => {
    dispatch(getallcourses());
     // Iniciar el temporizador de 3 segundos
     const timer = setTimeout(() => {
      setIsLoading(false); // Después de 3 segundos, establecemos isLoading en falso
    }, 3000); // Retraso de 3000 milisegundos (3 segundos)

    // Limpia el temporizador cuando el componente se desmonta o cuando se reinicia el efecto
    return () => clearTimeout(timer);
  }, [dispatch]);

  // Actualiza isMobile cuando cambia el tamaño de la ventana
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
          {courses.map((course) => (
            <div key={course.id} className={`w-${isMobile ? 'full' : '1/3'} p-4`}>
              <div className="w-[400px] mt-28 bg-white shadow-xl shadow-blue-400 rounded-xl overflow-hidden">
                <img src={course.imagen} alt={course.nombre} className="w-full h-auto" />
                <div className="p-4">
                  <h2 className="text-xl font-custom font-semibold mb-2">{course.nombre}</h2>
                  <p className="text-gray-700 font-custom">{course.descripcion}</p>
                  <div className="flex justify-between items-center mt-4">
                    <Link to={`/${course.id}`}>
                      <button
                        className="font-bold bg-bgla hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
                      >
                        Ver Mas
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

export default CardCoursesMas;
