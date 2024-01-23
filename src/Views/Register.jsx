import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo from "../Logocuadrado.jpg";
import zxcvbn from "zxcvbn"; // Importa la biblioteca zxcvbn
import { registerbasic } from "../Redux/Actions";

function Register() {
  const [errors, setErrors] = useState({});
  const [isFormSubmitted, setFormSubmitted] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    type: "user",
  });

  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isPasswordTouched, setPasswordTouched] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });

    if (name === "password") {
      setPasswordTouched(true);
      const result = zxcvbn(value);
      setPasswordStrength(result.score);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    const newErrors = {};

    // Validar campo de nombre
    if (!form.name.trim()) {
      newErrors.name = "El nombre es requerido";
    } else if (form.name.length > 20) {
      newErrors.name = "El nombre debe tener como máximo 20 caracteres";
    }

    // Validar campo de email
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

    if (Object.keys(newErrors).length === 0) {
      dispatch(registerbasic(form)).then((response) => {
        if (response.status === "approved") {
          navigate(`/verified/${form.email}/${form.name}`);
        }
      });

      setForm({
        name: "",
        email: "",
        password: "",
        type: "user",
      });
    }
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
            className="w-96 h-96 object-cover animate-spin-slow infinite"
          />
        </div>
      </div>

      {/* Columna derecha */}
      <div className="flex-1 bg-white p-8 flex items-center justify-center">
        <div className="w-96"> {/* Ancho máximo del formulario */}
          <h1 className="text-3xl font-semibold mb-4">Regístrate</h1>
          <form>
            <div className="mb-4">
              <label htmlFor="displayName" className="block text-gray-700">
                Nombre
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Tu nombre"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleInputChange}
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
                type="password"
                name="password"
                value={form.password}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Tu contraseña"
              />

              {isPasswordTouched && (
                <>
                  {/* Barra de fortaleza de contraseña */}
                  <div
                    style={{
                      height: "10px",
                      backgroundColor: getPasswordStrengthColor(passwordStrength),
                      width: "100%",
                      marginTop: "5px",
                    }}
                  />

                 
                  <p>{getPasswordStrengthLabel(passwordStrength)}</p>
                </>
              )}

              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-blue-800  h-8 text-white w-full rounded hover:bg-blue-900"
            >
              Registrarse
            </button>
          </form>
          <p className="mt-4">
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" className="text-blue-500 hover:underline">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

// Función para obtener el color de la barra de fortaleza según la puntuación de zxcvbn
function getPasswordStrengthColor(strength) {
  switch (strength) {
    case 0:
      return "red";
    case 1:
      return "orange";
    case 2:
      return "yellow";
    case 3:
      return "lightgreen";
    case 4:
      return "green";
    default:
      return "transparent";
  }
}

// Función para obtener una etiqueta de fortaleza de contraseña según la puntuación de zxcvbn
function getPasswordStrengthLabel(strength) {
  switch (strength) {
    case 0:
      return "Muy débil";
    case 1:
      return "Débil";
    case 2:
      return "Moderada";
    case 3:
      return "Fuerte";
    case 4:
      return "Muy fuerte";
    default:
      return "";
  }
}

export default Register;
