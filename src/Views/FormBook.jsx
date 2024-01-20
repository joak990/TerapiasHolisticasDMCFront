import { useState } from "react";
import { useDispatch } from "react-redux";
import { bookMessage } from "../Redux/Actions";

function FormBook() {
    const [input, setInput] = useState({
        nombre: "",
        apellido: "",
        email: "",
        telefono: ""
    });
    const [errors, setErrors] = useState({}); // Nuevo estado para manejar errores
    const dispatch = useDispatch();

    const handleInputChange = (event) => {
        setInput({
            ...input,
            [event.target.name]: event.target.value,
        });
        // Limpiar el error cuando el usuario comienza a escribir
        setErrors({
            ...errors,
            [event.target.name]: "",
        });
    };

    const validateForm = () => {
        let formIsValid = true;
        const newErrors = {};

        // Validar el campo 'nombre'
        if (!input.nombre.trim()) {
            newErrors.nombre = "El nombre es obligatorio";
            formIsValid = false;
        }

        // Validar el campo 'apellido'
        if (!input.apellido.trim()) {
            newErrors.apellido = "El apellido es obligatorio";
            formIsValid = false;
        }

        // Validar el campo 'email'
        if (!input.email.trim()) {
            newErrors.email = "El email es obligatorio";
            formIsValid = false;
        }

        // Validar el campo 'telefono'
        if (!input.telefono.trim()) {
            newErrors.telefono = "El teléfono es obligatorio";
            formIsValid = false;
        }

        setErrors(newErrors);
        return formIsValid;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (validateForm()) {
            // Solo envía el mensaje si la validación es exitosa
            dispatch(bookMessage(input));
            setInput({
                nombre: "",
                apellido: "",
                email: "",
                telefono: ""
            });
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center mt-28 md:mt-32">
            <div className="w-[300px] p-6 rounded-lg shadow-2xl md:h-[600px] md:w-1/2">
                <h2 className="text-3xl font-extralight mb-6 text-center">Hace tu pedido</h2>
                <p className="flex justify-center">
                    Luego nos pondremos en contacto contigo para que recibas el libro en tu domicilio!
                </p>
                <form className="space-y-4 " onSubmit={(e) => handleSubmit(e)}>
                    <div className="grid md:grid-cols-2 gap-4 w-full py-2">
                        <div className="flex flex-col">
                            <label className="uppercase text-sm py-2">Nombre</label>
                            <input
                                className={`border-2 rounded-lg p-3 flex border-gray-300 ${
                                    errors.nombre ? "border-red-500" : ""
                                }`}
                                type="text"
                                name="nombre"
                                value={input.nombre}
                                onChange={(e) => handleInputChange(e)}
                            />
                            {errors.nombre && (
                                <span className="text-red-500 text-xs">{errors.nombre}</span>
                            )}
                        </div>
                        <div className="flex flex-col">
                            <label className="uppercase text-sm py-2">Apellido</label>
                            <input
                                className={`border-2 rounded-lg p-3 flex border-gray-300 ${
                                    errors.apellido ? "border-red-500" : ""
                                }`}
                                type="text"
                                name="apellido"
                                value={input.apellido}
                                onChange={(e) => handleInputChange(e)}
                            />
                            {errors.apellido && (
                                <span className="text-red-500 text-xs">{errors.apellido}</span>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col py-2">
                        <label className="uppercase text-sm py-2">Email</label>
                        <input
                            className={`border-2 rounded-lg p-3 flex border-gray-300 ${
                                errors.email ? "border-red-500" : ""
                            }`}
                            type="text"
                            name="email"
                            value={input.email}
                            onChange={(e) => handleInputChange(e)}
                        />
                        {errors.email && (
                            <span className="text-red-500 text-xs">{errors.email}</span>
                        )}
                    </div>
                    <div className="flex flex-col py-2">
                        <label className="uppercase text-sm py-2">Telefono</label>
                        <input
                            className={`border-2 rounded-lg p-3 flex border-gray-300 ${
                                errors.telefono ? "border-red-500" : ""
                            }`}
                            type="number"
                            name="telefono"
                            value={input.telefono}
                            onChange={(e) => handleInputChange(e)}
                        />
                        {errors.telefono && (
                            <span className="text-red-500 text-xs">{errors.telefono}</span>
                        )}
                    </div>
                    <button
                        className="bg-bgla text-gray-100 mt-4 w-full p-4 rounded-lg"
                        type="submit"
                    >
                        Enviar mensaje
                    </button>
                </form>
            </div>
        </div>
    );
}

export default FormBook;
