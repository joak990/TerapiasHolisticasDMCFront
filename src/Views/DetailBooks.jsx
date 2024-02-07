import  { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Rating from "react-rating-stars-component";
import Swal from "sweetalert2";
import {
    createcomment,
    getAllComments,
    getallbooks,
} from "../Redux/Actions";
import Loading from "../Components/Loading";

function DetailBooks() {
    const { id } = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const courses = useSelector((state) => state.books);
    const allcomments = useSelector((state) => state.allComents);
    const course = courses?.find((course) => course.id === id);
    const namelocal = localStorage?.getItem("name");
    const iduser = localStorage.getItem("id");
    const dispatch = useDispatch();
    const [rating, setRating] = useState(0);
    const [errors, setErrors] = useState({});
    const [isFormSubmitted, setFormSubmitted] = useState(false);
    const [newComment, setNewComment] = useState("");
    const [coursess, setCoursess] = useState(null);

    console.log('courseeeees -<<<<', course );

    useEffect(() => {
        dispatch(getallbooks());
        dispatch(getAllComments(id)).then(() => {
            setIsLoading(false);
        });
    }, [dispatch, id]);

    useEffect(() => {
        // Almacena el curso actual en el almacenamiento local
        localStorage.setItem("currentCourse", JSON.stringify(course));
    }, [course]);

    // Recupera el curso actual del almacenamiento local al cargar la página
    useEffect(() => {
        const storedCourse = localStorage.getItem("currentCourse");
        if (storedCourse) {
            try {
                const parsedCourse = JSON.parse(storedCourse);
                if (parsedCourse && parsedCourse.id === id) {
                    // Si el curso almacenado coincide con el ID actual, establece el curso en el estado
                    setCoursess(parsedCourse);
                }
            } catch (error) {
                // Manejar cualquier error al analizar JSON
                console.error("Error analizando JSON desde localStorage:", error);
            }
        }
    }, [id]);

    const courseId = course ? course.id : null;
    const [form, setForm] = useState({
        id: iduser,
        curso: courseId,
        Contenido: "",
        rating: "",
    });

    const handleRatingChange = (value) => {
        setRating(value);
        setForm({
            ...form,
            rating: value.toString(),
        });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const renderCourseContents = (course) => {
        switch (course?.id) {
            case "5":
                return (
                    <>
                        <p className="font font-semibold text-lg">Contenidos</p>
                        <p>"Este libro cuenta  el recorrido  de momentos y aspectos de las experiencias de personas que integraron <br />
                        sus cuerpos : el físico, mental , emocional y espiritual. <br />
                        Desmitifica  "el final" como concepto  de muerte escrito por marcela que vive actualmente en la falda <br />
                        Provincia de córdoba y miguel y jorge , dos seres que pasaron por esta tierra, vivieron sus experiencias <br />
                        Como humanos y ahora asisten desde el plano espiritual. <br />
                        Ellos tres dejan de lado  el "por que" y cuentan  sus conocimientos sobre el "para que" <br />
                        En la búsqueda de respuestas hablan sobre "el ser" , el alma, Dios , la energía. <br />
                        y sus vibraciones , entre otros temas , integrándolos a los saberes terrenales <br />
                         para darle una "vuelta de rosca" a nuestras creencias sobre las relaciones, el cuerpo  las enfermedades y los caminos individuales. <br />
                         Si aún no tenés curiosidad , estoy segura que al adentrarte en estas páginas  y sumergirte en sus palabras , se te va a despertar."</p>
                    </>
                );
            

            default:
                return <p>Contenidos no disponibles</p>;
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setFormSubmitted(true);
        const newErrors = {};

        if (!form.Contenido.trim()) {
            newErrors.Contenido = "El mensaje no puede estar vacío";
        } else if (form.Contenido.length < 6) {
            newErrors.Contenido = "El mensaje debe tener al menos 6 caracteres";
        } else if (form.Contenido.length > 400) {
            newErrors.Contenido = "El mensaje debe tener como máximo 400 caracteres";
        }

        if (!form.rating.trim()) {
            newErrors.rating = "Debes completar este campo";
        }
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            dispatch(createcomment(form));

            // Actualiza el comentario en el localStorage

            Swal.fire({
                title: "Comentario enviado",
                icon: "success",
                buttonsStyling: false,
                customClass: {
                    confirmButton: "bg-blue-600 text-white rounded-md px-4 py-2",
                },
            });

            setNewComment(form.Contenido);
            localStorage.setItem("currentCourse", JSON.stringify(course));
            setForm({
                Contenido: "",
                Rating: "",
                id: "",
                curso: "",
            });
        }
    };

    return (
        <div className="mt-44 mx-2 sm:mx-4 lg:mx-8">
            {isLoading ? (
                <Loading />
            ) : (
                <div className="bg-white rounded-lg shadow-xl shadow-blue-200 p-4 sm:p-6 lg:p-8 sm:flex">
                    <div className="mb-4 sm:w-1/2 sm:mr-4 lg:w-1/3 lg:mr-6">
                        <video
                            src={course?.link}


                            autoPlay
                            alt={course?.nombre}
                            controls
                            className="w-full rounded-lg border border-purple-600"
                        />
                        <div className="mt-2 sm:mt-4">
                            <div className="sm:ml-2">
                                <div className="flex justify-between items-center">
                                    <div className="w-1/2">
                                        <Rating
                                            name="rating"
                                            count={5}
                                            value={4.5}
                                            edit={false}
                                            size={30}
                                            activeColor="#ffd700"
                                        />
                                    </div>
                                    <div className=" flex items-center  text-right">
                                        <span className="text-red-500 text-sm  md:text-xl  ml-4 line-through">
                                            {" "}
                                            $14.000{" "}
                                        </span>

                                        <span className="text-green-600 md:text-xl text-sm ml-4 font-bold font-custom">
                                            ${course?.precio}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex mt-4  justify-start">
                                    <Link to="/form">
                                    <button
                                        className="font-bold bg-bgla hover:bg-blue-600 text-white font-bold w-28 h-8 rounded-full"
                                        >
                                        Comprar
                                    </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <h2 className="font-semibold">
                                Tenes mas dudas sobre este curso hace{" "}
                                <span className="text-blue-700 cursor-pointer">click aqui</span>{" "}
                            </h2>
                        </div>
                    </div>
                    <div className="sm:w-1/2 sm:ml-4 lg:w-2/3 lg:ml-6">
                        <h1 className="text-2xl font-bold mb-4">{course?.nombre}</h1>
                        {renderCourseContents(course)}
                        <div className="flex items-center justify-between mb-4"></div>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="Contenido" className="block text-gray-600">
                                    Comentar:
                                </label>
                                <textarea
                                    id="Contenido"
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                    rows="4"
                                    name="Contenido"
                                    value={form.Contenido}
                                    onChange={handleInputChange}
                                />
                                {errors.Contenido && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.Contenido}
                                    </p>
                                )}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="rating" className="block text-gray-600">
                                    Calificación:
                                </label>

                                <Rating
                                    name="rating"
                                    count={5}
                                    value={rating}
                                    onChange={handleRatingChange}
                                    size={30}
                                    activeColor="#ffd700"
                                />

                                {errors.rating && (
                                    <p className="text-red-500 text-sm mt-1">{errors.rating}</p>
                                )}
                            </div>
                            <button
                                onClick={handleSubmit}
                                className="bg-blue-500 text-white font-bold px-4 py-2 rounded-full hover-bg-blue-600 mt-4"
                            >
                                Enviar Comentario
                            </button>
                        </form>
                    </div>
                </div>
            )}
            <div className="mt-20">
                <h1 className="text-2xl font-bold text-center">Comentarios</h1>
                {allcomments && allcomments?.length > 0 ? (
                    allcomments.map((el, index) => (
                        <div
                            className="mt-4  md:ml-4 p-4 rounded-lg border border-gray-300 md:border-none"
                            key={index}
                        >
                            <h2 className="font-semibold text-xl">{el?.User?.name}</h2>
                            <div className="flex items-center">
                                <Rating
                                    name={`rating_${index}`}
                                    count={5}
                                    value={parseFloat(el?.rating)}
                                    edit={false}
                                    size={30}
                                    activeColor="#ffd700"
                                />
                            </div>
                            <p className="mt-2 text-gray-700">{el?.Contenido}</p>
                        </div>
                    ))
                ) : (
                    <div className="mt-10 flex justify-center">
                        <h1 className="text-gray-700">No hay comentarios</h1>
                    </div>
                )}
                {/* Renderiza el nuevo comentario si existe */}
                {newComment && (
                    <div className="mt-4  md:ml-4 p-4 rounded-lg border border-gray-300 md:border-none">
                        <h2 className="font-semibold text-xl">{namelocal}</h2>{" "}
                        {/* Reemplaza "Tu Nombre" con el nombre del usuario actual */}
                        <div className="flex items-center">
                            <Rating
                                name={`rating_new`}
                                count={5}
                                value={rating}
                                edit={false}
                                size={30}
                                activeColor="#ffd700"
                            />
                        </div>
                        <p className="mt-2 text-gray-700">{newComment}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DetailBooks;
