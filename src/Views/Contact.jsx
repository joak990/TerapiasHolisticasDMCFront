import { useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa"; // Importa los íconos de react-icons

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isRecaptchaValid, setRecaptchaValid] = useState(false);
  const [isFormSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

    // Validar campo de mensaje
    if (!form.message.trim()) {
      newErrors.message = "Su mensaje es requerido";
    } else if (form.message.length < 10) {
      newErrors.message = "El mensaje debe tener al menos 10 caracteres";
    } else if (form.message.length > 1000) {
      newErrors.message = "El mensaje debe tener máximo 1000 caracteres";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      if (!isRecaptchaValid) {
        // Mostrar un mensaje de error o tomar alguna acción adicional
        return;
      }

      // Lógica para enviar el formulario (dispatch, redireccionamiento, etc.)
      dispatch(); // Reemplaza esto con tu acción de Redux

      // Redireccionar al usuario después de enviar el formulario
      navigate("/");

      // Limpiar el formulario
      setForm({
        name: "",
        email: "",
        message: "",
      });
    }
  };

  return (
    <div className="  min-h-screen flex justify-center items-center mt-28 md:mt-44 ">
      <div className=" w-[300px] p-6 rounded-lg shadow-2xl shadow-black md:w-1/2">
        <h2 className="text-3xl font-montserrat_alternates text-blue-950 mb-6 text-center">Contáctanos</h2>
        <form action="https://getform.io/f/7a095ddb-8434-4364-9dc2-fb16286e3641" method="POST" className="space-y-4 ">
        <div className=" grid md:grid-cols-2 gap-4 w-full py-2">
                    <div className=" flex flex-col">
                        <label className=" uppercase font-montserrat_alternates text-blue-950 text-sm py-2">Nombre</label>
                        <input className=" border-2 rounded-lg p-3 flex border-blue-950" type="text" name='name'></input>
                    </div>
                    <div className=" flex flex-col">
                        <label className=" uppercase text-sm font-montserrat_alternates text-blue-950 py-2">Numero de Telefono</label>
                        <input  className=" border-2 rounded-lg p-3 flex border-blue-950" type="text" name='phone'></input>
                    </div>
                </div>
                <div className=" flex flex-col py-2">
                    <label className=" uppercase text-sm py-2 font-montserrat_alternates text-blue-950 " >Email</label>
                    <input className=" border-2 rounded-lg p-3 flex border-blue-950" type="text" name="email"></input>
                </div>
                <div className=" flex flex-col py-2">
                    <label className=" uppercase text-sm py-2 font-montserrat_alternates text-blue-950" >Asunto</label>
                    <input className=" border-2 rounded-lg p-3 flex border-blue-950" type="text" name="subject"></input>
                </div>
                <div className=" flex flex-col py-2">
                    <label className=" uppercase text-sm py-2 font-montserrat_alternates text-blue-950" >Mensaje</label>
                    <textarea className=" border-2 rounded-lg p-3 border-blue-950 " rows='10' name="message"></textarea>
                </div>
                <button className=" bg-bgla text-gray-100 mt-4 w-full p-4 rounded-lg font-montserrat_alternates text-blue-950">Enviar mensaje</button>
        </form>

        <div className="flex justify-end mt-4">
          {/* Íconos de redes sociales con enlaces */}
          <a
            href="https://www.instagram.com/terapiasholisticas.dmc/?hl=es"
            target="_blank"
            rel="noopener noreferrer"
            className="mr-3 text-blue-600 hover:text-blue-800"
          >
            <FaInstagram size={32} /> {/* Usar el ícono FaInstagram */}
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=100064166696012"
            target="_blank"
            rel="noopener noreferrer"
            className="mr-3 text-blue-600 hover:text-blue-800"
          >
            <FaFacebook size={32} /> {/* Usar el ícono FaFacebook */}
          </a>
        
        </div>
      </div>
    </div>
  );
}

export default Contact;
