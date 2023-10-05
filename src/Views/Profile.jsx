import React, { useState } from 'react';

function Profile() {
  const storedFotoURL = localStorage.getItem("fotoURL");
  const [nombre, setNombre] = useState(localStorage.getItem("name") || ''); // Obtener y establecer el nombre
  const [email, setEmail] = useState(localStorage.getItem("email") || ''); // Obtener y establecer el email

  const [isChangePassword, setChangePassword] = useState(false); // Estado para mostrar u ocultar los campos de contraseña
  const [errors, setErrors] = useState({});
  const [isRecaptchaValid, setRecaptchaValid] = useState(false);
  const [isFormSubmitted, setFormSubmitted] = useState(false);
  const [genero, setGenero] = useState('')

  const pass = "******"

  const [form, setForm] = useState({
    name : nombre,
    email : email,
    password : pass,
    genero: genero,
    
    
  });
   
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  

  const handleSubmit = (event) => {
    event.preventDefault();
 
    const newErrors = {};

    // Validar campo de nombre
    if (!form.name.trim()) {
      newErrors.name = "El nombre es requerido";
    } else if (form.name.length > 15) {
      newErrors.name = "El nombre debe tener como máximo 20 caracteres";
    }

    // Validar campo de contraseña
    if (!form.tel.trim()) {
      newErrors.tel = "El telefono es requerido";
    } else if (form.tel.length < 8) {
      newErrors.tel = " debe tener al menos 8 caracteres";
    } else if (form.tel.length > 20) {
      newErrors.tel = "debe tener como máximo 20 caracteres";
    }

    if (!form.address.trim()) {
        newErrors.address = " *Debes completar este Campo";
        
      }

    setErrors(newErrors);

    // Si no hay errores, enviar el formulario
   
    
    }
    const handleGeneroChange = (event) => {
        const selectedGenero = event.target.value;
        setGenero(selectedGenero); // Actualizamos el estado "genero" con el valor seleccionado
      };
    

  return (
    <div className="flex justify-center mt-96 md:mt-44 items-center h-screen">
      <div className="bg-white p-8 w-[500px] rounded-lg shadow-md">
        {/* Foto de perfil */}
        <div className="text-center mb-4">
        <img
    src={ storedFotoURL}
    alt="Foto de perfil"
    className="w-24 h-24 rounded-full mx-auto mb-2"
  />
        </div>

    
        <form onSubmit={handleSubmit}>
      
          <div className="mb-4">
            <label className="block font-bold mb-2">Nombre:</label>
            <input
            onChange={handleInputChange}
              type="text"
              className="border rounded-lg w-full p-2"
              placeholder="Nombre"
              value={form.name}
              name='name'
            
            />
          </div>

        
          <div className="mb-4">
            <label className="block font-bold mb-2">Email:</label>
            <input
              type="email"
              className="border rounded-lg w-full p-2"
              placeholder="Email"
              value={form.email}
         onChange={handleInputChange}
            />
          </div>

         
          <div className="mb-4">
            <label className="block font-bold mb-2">Contraseña:</label>
            <div className="flex items-center">
              <input
             onChange={handleInputChange}
                className="border rounded-lg w-full p-2"
                placeholder="Contraseña"
                value={form.password}
              />
             
            </div>
          </div>

          
          <div className="mb-4">
            <label className="block font-bold mb-2">Sexo:</label>
            <select name='genero' value={form.genero} onChange={handleGeneroChange}className="border rounded-lg w-full p-2">
              <option  value="Masculino">Masculino</option>
              <option  value="femenino">Femenino</option>
            </select>
          </div>

   
          <div className="text-center">
            <button type="submit" className="bg-bgla text-white py-2 px-4 rounded-lg hover:bg-blue-600">
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;

