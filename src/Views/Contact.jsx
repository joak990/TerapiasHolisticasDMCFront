import { useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

function Contact() {
    const [form, setForm] = useState({
        name : "",
        email : "",
        message : "",
      
      
        
      });
      const [errors, setErrors] = useState({});
      const [isRecaptchaValid, setRecaptchaValid] = useState(false);
      const [isFormSubmitted, setFormSubmitted] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setForm({
          ...form,
          [name]: value,
        });
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
        if (!form.message.trim()) {
          newErrors.message = "Su mensaje es requerido";
        } else if (form.message.length < 6) {
          newErrors.message = "El mensaje debe tener al menos 10 caracteres";
        } else if (form.message.length > 1000) {
          newErrors.message = "El mensaje debe tener maxímo 1000 caracteres";
        }
    
        setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
          if (!isRecaptchaValid) {
            // Mostrar un mensaje de error o tomar alguna acción adicional
            return;
          }
          dispatch()
          navigate("/")
          setForm({
            name: "",
            email: "",
            message: "",
          });
         
    }
      };
     
    return (
      <div className="min-h-screen flex justify-center items-center mt-96 md:mt-44 bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-md  w-1/2">
          <h2 className="text-3xl font-semibold mb-6">Contáctanos</h2>
          <form className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="name" className="text-sm font-medium text-gray-600">
                Nombre:
              </label>
              <input
              onChange={handleInputChange}
              name="name"
                value={form.name}
                type="text"
                className="border rounded-md py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Introduzca su nombre"
              />
               {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm font-medium text-gray-600">
                Email:
              </label>
              <input
               onChange={handleInputChange}
              value={form.email}
                name="email"
                type="email"
                className="border rounded-md py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Introduzca su email"
              />
               {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="message" className="text-sm font-medium text-gray-600">
                Consulta:
              </label>
              <textarea
               onChange={handleInputChange}
              value={form.message}
                name="message"
                rows="4"
                className="border rounded-md py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Escriba su consulta aquí"
              ></textarea>
               {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message}</p>
          )}
            </div>
            <div className="flex justify-center">
              <button
              onClick={handleSubmit}
                type="submit"
                className="bg-bgla hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  
  export default Contact;
  