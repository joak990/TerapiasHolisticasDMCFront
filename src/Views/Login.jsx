import logo from "../Logocuadrado.jpg";
import { Link, useNavigate } from "react-router-dom";
import { app } from "../firebaseconfig";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { Loginregister, register_google } from "../Redux/Actions";
import { useState } from "react";


function Login() {
  const provider = new GoogleAuthProvider();
  
  const firebaseAuth = getAuth(app);
  const navigate = useNavigate();
  const [isFormSubmitted, setFormSubmitted] = useState(false);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    email : "",
    password : "",      
  });

  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
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
      if (response.data === true) {
        Swal.fire({
          title: "Usuario bloqueado",
          icon: "error",
          buttonsStyling: false,
          customClass: {
            confirmButton: "bg-orange-600 text-white rounded-md px-4 py-2",
          },
        });
      } else {
        navigate("/");
        localStorage.setItem('name',response.user.displayName)
      }
    });
  };
  

   const handleSubmit = (event) => {
      event.preventDefault();
      setFormSubmitted(true);
      const newErrors = {};     
      if (!form.email.trim()) {
        newErrors.email = "El email es requerido";
      } else if (!/\S+@\S+\.\S+/.test(form.email.trim())) {
        newErrors.email = "El email no es válido";
      } else if (form.email.length > 30) {
        newErrors.email = "El email debe tener como máximo 30 caracteres";
      }
  
      // Validar campo de contraseña
      if (!form.password.trim()) {
        newErrors.password = "La contraseña es requerida";
      } else if (form.password.length < 6) {
        newErrors.password = "La contraseña debe tener al menos 6 caracteres";
      } else if (form.password.length > 20) {
        newErrors.password = "La contraseña debe tener como máximo 20 caracteres";
      }
  
      setErrors(newErrors);
      console.log("cliclk");
  if (Object.keys(newErrors).length === 0) {
dispatch(Loginregister(form)).then((response) => {

  console.log(response,"ident");
  if(response == true) {
    navigate("/")
    
   
  }else {
    Swal.fire({
      title: 'Datos Incorrectos',
      icon: 'error',
      buttonsStyling: false,
      customClass: {
        confirmButton: 'bg-orange-600 text-white rounded-md px-4 py-2',
      }
    })
  }
  })
    setForm({
      email: "",
     password:""
    });
  }}

  return (
    <div className="flex">
      {/* Columna izquierda con fondo verde */}
      <div className="flex-1 bg-fondolog">
        {/* Coloca aquí tu imagen */}
        <div className="flex justify-center items-center h-screen">
          <div className="transform rotate-0">
            <img
              src={logo}
              alt="Imagen"
              className="w-96 h-96 object-cover animate-spin-slow infinite"
            />
          </div>
        </div>
      </div>

      {/* Columna derecha */}
      <div className="flex-1 bg-white p-8 flex items-center justify-center">
        <div className="w-96"> {/* Ancho máximo del formulario */}
          <h1 className="text-3xl font-semibold mb-4">Iniciar Sesión</h1>
          <form>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <input
              value={form.email}
              onChange={handleInputChange}
                type="email"
                id="email"
                name="email"
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Tu correo electrónico"
              />
              {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">
                Contraseña
              </label>
              <input
              value={form.password}
              name="password"
              onChange={handleInputChange}
                type="password"
                id="password"
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Tu contraseña"
              />
              {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-bgla text-white py-2 px-4 rounded hover:bg-blue-900"
            >
              Iniciar Sesión
            </button>
          </form>
          <p className="mt-4">
            ¿No tienes una cuenta?{" "}
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
