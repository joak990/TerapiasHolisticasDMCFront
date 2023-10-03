import logo from "../Logocuadrado.jpg"
import { Link, useNavigate } from 'react-router-dom';
import { app } from '../firebaseconfig';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  setPersistence,
  browserSessionPersistence,
} from 'firebase/auth';
import { FcGoogle } from "react-icons/fc";
import Swal from 'sweetalert2'
import { useDispatch } from "react-redux";
import { register_google } from "../Redux/Actions";
function Login() {
  const provider = new GoogleAuthProvider();
  const firebaseAuth = getAuth(app);
const navigate = useNavigate()
const dispatch = useDispatch()
const handleLogin = async () => {
  await setPersistence(firebaseAuth, browserSessionPersistence);
  const response = await signInWithPopup(firebaseAuth, provider);

  const datauser = {
    name: response.user.displayName,
    email: response.user.email,
    type: "user",
    uid: response.user.uid,
  };

  dispatch(register_google(datauser)).then((response) => {
    console.log(response);
  if(response === true) {
    Swal.fire({
      title: 'Usuario bloqueado',
      icon: 'error',
      buttonsStyling: false,
      customClass: {
        confirmButton: 'bg-orange-600 text-white rounded-md px-4 py-2',
      }
    })
  }else {
    navigate("/")
  }
  })



};

  return (
    <div className="flex">
      {/* Columna izquierda con fondo verde */}
      <div className="flex-1 bg-fondolog ">
        {/* Coloca aquí tu imagen */}
        <div className="flex justify-center items-center h-screen"> 
          <img
            src={logo}
            alt="Imagen"
            className="w-96 h-96 object-cover"
          />
        </div>
      </div>

      {/* Columna derecha */}
      <div className="flex-1 bg-white p-8 flex items-center justify-center">
        <div className="w-96"> {/* Ancho máximo del formulario */}
          <h1 className="text-3xl font-semibold mb-4">Iniciar Sesión</h1>
          <form>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Tu correo electrónico"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">Contraseña</label>
              <input
                type="password"
                id="password"
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Tu contraseña"
              />
            </div>
            <button
              type="submit"
              className="bg-bgla text-white py-2 px-4 rounded hover:bg-blue-900"
            >
              Iniciar Sesión
            </button>
          </form>
          <p className="mt-4">
            ¿No tienes una cuenta?{' '}
            <Link to="/register" className="text-blue-500 hover:underline">
              Regístrate aquí
            </Link>
          </p>
          <button
            onClick={handleLogin}
            className="mt-8 bg-bgla text-white py-2 px-4 rounded hover:bg-blue-900 flex items-center"
          > 
           Iniciar sesión con Google
           <FcGoogle className="text-2xl ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;

