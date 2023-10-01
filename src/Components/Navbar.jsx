import React from "react";
import logo from "../assets/Logocuadrado.jpg";
import { Navigate, useNavigate } from "react-router-dom";

function Navbar() {
 const navigate =useNavigate()
  const displayName = localStorage.getItem('displayName');
  const handleLogout = () => {
    // Eliminar el displayName del localStorage
    localStorage.removeItem('displayName');

    // Redirigir al usuario a la página de inicio
    navigate("/");
  };
  return (
    <nav className="bg-custom p-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center"> {/* Contenedor del logo y el texto */}
            <img src={logo} alt="Logo" className="w-14 h-14 rounded-full mr-2" /> {/* Cambia la ruta al logotipo */}
            <div className="text-custom font-custom font-extralight text-2xl md:text-3xl">Terapias Holísticas DMC</div>
          </div>
          <div className="md:flex md:items-center md:space-x-24 mt-4 md:mt-0">
            <ul className="md:flex md:space-x-8 text-white md:text-lg">
              <li>
                <a href="#" className="hover:text-yellow-300">Inicio</a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-300">Cursos</a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-300">Sobre mi</a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-300">Contacto</a>
              </li>
              {displayName ? (
                // Mostrar "Mis Cursos" si hay un displayName en localStorage
                <li>
                  <a href="#" className="hover:text-yellow-300">Mis Cursos</a>
                </li>
              ) : null}
              {!displayName ? (
                // Mostrar "Iniciar Sesión" solo si no hay displayName en localStorage
                <li>
                  <a href="/login" className="hover:text-yellow-300">Iniciar Sesión</a>
                </li>
              ) : null}
              {displayName ? (
                // Mostrar "Iniciar Sesión" solo si no hay displayName en localStorage
                <li>
                  <a href="/"  onClick={handleLogout} className="hover:text-yellow-300">Cerrar Sesión</a>
                </li>
              ) : null}
              
            </ul>
            
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
