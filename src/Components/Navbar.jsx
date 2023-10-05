import { getAuth, signOut } from "firebase/auth";
import logo from "../Logocuadrado.jpg";
import { Link, useNavigate } from "react-router-dom";
import { app } from "../firebaseconfig";
import { CiShoppingCart } from 'react-icons/ci';
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate()
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isOptionsOpen, setOptionsOpen] = useState(false); // Estado para controlar la visibilidad de las opciones
  const firebaseAuth = getAuth(app);
  const storedFotoURL = localStorage.getItem("fotoURL");
  const user = firebaseAuth?.currentUser;
  const displayName = localStorage.getItem('email');
  const fotoURL = user?.photoURL
  if (fotoURL) {
    localStorage.setItem("fotoURL", fotoURL);
  }

  const handleLogout = async () => {
    // Eliminar el displayName del localStorage
    console.log("click");
    await signOut(firebaseAuth);
    localStorage.removeItem('id');
    localStorage.removeItem('userPhotoURL');
    localStorage.removeItem('PHOTO');
    localStorage.removeItem('newphoto');
    localStorage.removeItem('email');
    // Redirigir al usuario a la página de inicio
    navigate("/");
  };

  // Función para alternar la visibilidad de las opciones al hacer clic en la foto
  const toggleOptions = () => {
    setOptionsOpen(!isOptionsOpen);
  };

  return (
    <nav className="bg-custom p-8 fixed top-0 left-0 w-full z-10">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center"> {/* Contenedor del logo y el texto */}
            <Link to="/">
              <img src={logo} alt="Logo" className="w-14 h-14 rounded-full mr-2" /> {/* Cambia la ruta al logotipo */}
            </Link>
            <div className="text-white font-custom font-extralight text-2xl md:text-3xl">Terapias Holísticas DMC</div>
          </div>
          <div className="md:flex md:items-center md:space-x-24 mt-4 md:mt-0">
            <ul className="md:flex md:space-x-8 text-white md:text-lg">
              <li>
                <a href="/" className="hover:text-blue-800 font-custom text-2xl">Inicio</a>
              </li>
              <li>
                <a href="/courses" className="hover:text-blue-800 font-custom text-2xl">Cursos</a>
              </li>
              <li>
                <a href="/me" className="hover:text-blue-800 font-custom text-2xl">Sobre mi</a>
              </li>
              <li>
                <a href="/contact" className="hover:text-blue-800 font-custom text-2xl">Contacto</a>
              </li>
              {displayName ? (
                // Mostrar "Mis Cursos" si hay un displayName en localStorage
                <li>
                  <a href="/mycourses" className="hover:text-blue-800 font-custom text-2xl">Mis Cursos</a>
                </li>
              ) : null}
              {!displayName ? (
                // Mostrar "Iniciar Sesión" solo si no hay displayName en localStorage
                <li>
                  <a href="/login" className="hover:text-blue-800 font-custom text-2xl">Iniciar Sesión</a>
                </li>
              ) : null}
              {displayName ? (
                // Mostrar "Cerrar Sesión" si hay un displayName en localStorage
                <li>
                  <button  onClick={handleLogout} className="hover:text-blue-800  cursor-pointer font-custom text-2xl">Cerrar Sesión</button>
                </li>
              ) : null}
            </ul>
            <div className="flex items-center relative"> 
            <div>
              <CiShoppingCart className="text-4xl"></CiShoppingCart>
            </div>
              <div onClick={toggleOptions}> {/* Hacer clic en la foto para abrir/cerrar el menú */}
                <img src={storedFotoURL} className="font-custom rounded-full h-9 cursor-pointer" alt="Foto de perfil" />
              </div>
              {isOptionsOpen && ( // Mostrar las opciones si isOptionsOpen es true
                <div className="absolute right-0 top-10 bg-white w-44 p-2 rounded shadow-md">
                  <ul>
                    <li>
                      <a href="/profile" className="hover:text-blue-800 font-custom text-xl block">Mi Perfil</a>
                    </li>
                    <li>
                      <a href="/mycourses" className="hover:text-blue-800 font-custom text-xl block">Mis Cursos</a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
            
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
