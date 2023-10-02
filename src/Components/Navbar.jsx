
import { getAuth } from "firebase/auth";
import logo from "../Logocuadrado.jpg";
import {  useNavigate } from "react-router-dom";
import { app } from "../firebaseconfig";
import { CiShoppingCart } from 'react-icons/ci';
function Navbar() {
 const navigate =useNavigate()
 const firebaseAuth = getAuth(app);

 
 const user = firebaseAuth?.currentUser;
  const displayName = localStorage.getItem('displayName');
  const fotogoogle = user?.photoURL
  const handleLogout = () => {
    // Eliminar el displayName del localStorage
    localStorage.removeItem('displayName');

    // Redirigir al usuario a la página de inicio
    navigate("/");
  };
  return (
    <nav className="bg-custom p-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center"> {/* Contenedor del logo y el texto */}
            <img src={logo} alt="Logo" className="w-14 h-14 rounded-full mr-2" /> {/* Cambia la ruta al logotipo */}
            <div className="text-white font-custom font-extralight text-2xl md:text-3xl">Terapias Holísticas DMC</div>
          </div>
          <div className="md:flex md:items-center md:space-x-24 mt-4 md:mt-0">
            <ul className="md:flex md:space-x-8 text-white md:text-lg">
              <li>
                <a href="#" className="hover:text-blue-800 font-custom text-2xl">Inicio</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-800 font-custom text-2xl">Cursos</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-800 font-custom text-2xl">Sobre mi</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-800 font-custom text-2xl">Contacto</a>
              </li>
              {displayName ? (
                // Mostrar "Mis Cursos" si hay un displayName en localStorage
                <li>
                  <a href="#" className="hover:text-blue-800 font-custom text-2xl">Mis Cursos</a>
                </li>
              ) : null}
              {!displayName ? (
                // Mostrar "Iniciar Sesión" solo si no hay displayName en localStorage
                <li>
                  <a href="/login" className="hover:text-blue-800 font-custom text-2xl">Iniciar Sesión</a>
                </li>
              ) : null}
             
              
            </ul>
            <div className="flex justify-between gap-2 ">
              <CiShoppingCart className="text-4xl "></CiShoppingCart>
              <div>
              <img src={fotogoogle}  onClick={handleLogout} className=" font-custom rounded-full h-9"></img>
              </div>
 
             </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
