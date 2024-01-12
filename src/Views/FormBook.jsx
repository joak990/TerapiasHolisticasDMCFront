import { useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
// import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa"; // Importa los íconos de react-icons

function FormBook() {
    const [input, setInput] = useState({
        name: "",
        apellido: "",
        email: "",
        curso: "",
        telefono: ""
    });
    // const navigate = useNavigate();
    // const dispatch = useDispatch();


    const handleInputChange = (event) => {
        setInput({
            ...input,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const aux = Object.keys(errors)
        if(aux.length === 0 ){
            console.log(input, '--->>>INPUT');
            //dispatch
            setInput({
                name: "",
                apellido: "",
                email: "",
                curso: "",
                telefono: ""
            })
        }
    };

    return (

        <div className="  min-h-screen flex justify-center items-center mt-28 md:mt-44 ">
            <div className=" w-[300px] p-6 rounded-lg shadow-2xl shadow-black md:w-1/2">
                <h2 className="text-3xl font-extralight mb-6 text-center">Contáctanos</h2>
                <form className="space-y-4 " onSubmit={(e) => handleSubmit(e)}>
                    <div className=" grid md:grid-cols-2 gap-4 w-full py-2">
                        <div className=" flex flex-col">
                            <label className=" uppercase text-sm py-2">Nombre</label>
                            <input
                                className=" border-2 rounded-lg p-3 flex border-gray-300"
                                type="text"
                                name='name'
                                value={input.name}
                                onChange={(e) => handleInputChange(e)}
                            >
                            </input>
                        </div>
                        <div className=" flex flex-col">
                            <label className=" uppercase text-sm py-2">Apellido</label>
                            <input
                                className=" border-2 rounded-lg p-3 flex border-gray-300"
                                type="text"
                                name='apellido'
                                value={input.apellido}
                                onChange={(e) => handleInputChange(e)}
                            ></input>
                        </div>
                    </div>
                    <div className=" flex flex-col py-2">
                        <label className=" uppercase text-sm py-2" >Email</label>
                        <input
                            className=" border-2 rounded-lg p-3 flex border-gray-300"
                            type="text"
                            name="email"
                            value={input.email}
                            onChange={(e) => handleInputChange(e)}
                        ></input>
                    </div>
                    <div className=" flex flex-col py-2">
                        <label className=" uppercase text-sm py-2" >Curso</label>
                        <input
                            className=" border-2 rounded-lg p-3 flex border-gray-300"
                            type="text"
                            name="curso"
                            value={input.curso}
                            onChange={(e) => handleInputChange(e)}
                        ></input>
                    </div>
                    <div className=" flex flex-col py-2">
                        <label className=" uppercase text-sm py-2" >Telefono</label>
                        <input
                            className=" border-2 rounded-lg p-3 flex border-gray-300"
                            type="text"
                            name="telefono"
                            value={input.telefono}
                            onChange={(e) => handleInputChange(e)}
                        ></input>
                    </div>
                    <button className=" bg-bgla text-gray-100 mt-4 w-full p-4 rounded-lg" type="submit">Enviar mensaje</button>
                </form>

            </div>
        </div>
    );
}

export default FormBook;
