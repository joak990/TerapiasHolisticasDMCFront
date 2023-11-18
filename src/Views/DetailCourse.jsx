import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Rating from "react-rating-stars-component";
import Swal from "sweetalert2";
import {
  addToCart,
  createcomment,
  getAllComments,
  getallcourses,
} from "../Redux/Actions";
import Loading from "../Components/Loading";

function DetailCourse() {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const courses = useSelector((state) => state.courses);
  const allcomments = useSelector((state) => state.allComents);
  const course = courses?.find((course) => course.id === id);
  const namelocal = localStorage?.getItem("name");
  const iduser = localStorage.getItem("id");
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [errors, setErrors] = useState({});
  const [isRecaptchaValid, setRecaptchaValid] = useState(false);
  const [isFormSubmitted, setFormSubmitted] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [coursess, setCoursess] = useState(null);

  useEffect(() => {
    dispatch(getallcourses());
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
  const handleBuyClick = (course) => {
    const accountVerified = localStorage.getItem("name");
    if (!accountVerified) {
      Swal.fire({
        title: "Necesitas iniciar sesión",
        text: "Para comprar este curso, debes iniciar sesión.",
        icon: "error",
        showCancelButton: true,
        confirmButtonText: "Iniciar Sesión",
      }).then((result) => {
        if (result.isConfirmed) {
          // Redirigir al usuario a la página de inicio de sesión
          window.location.href = "/login"; // Cambia '/login' por la URL de tu página de inicio de sesión
        }
      });
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const courseAlreadyInCart = cart.some(
      (cartItem) => cartItem.id === course.id
    );

    if (courseAlreadyInCart) {
      // Si el curso ya está en el carrito, mostrar un mensaje de error
      Swal.fire({
        title: "No puedes volver a agregar este curso",
        text: "Este curso ya se encuentra en tu carrito de compras.",
        icon: "error",
      });
    } else {
      // Si el curso no está en el carrito, agregarlo
      dispatch(addToCart({ course }));
      cart.push(course);
      Swal.fire({
        title: "Producto agregado al carrito!",
        text: "¿Deseas seguir comprando o ir al carrito?",
        icon: "success",
        showCancelButton: true,
        confirmButtonText: "Ir al carrito",
        cancelButtonText: "Seguir comprando",
        customClass: {
          confirmButton: "bg-blue-200 text-white", // Clase para el botón "Ir al carrito"
          cancelButton: "bg-gray-200 text-white", // Clase para el botón "Seguir comprando"
        },
      }).then((result) => {
        if (result.isConfirmed) {
          // Redirige a /myshop
          window.location.href = "/myshop";
        } else {
          // Continúa comprando
          // Puedes agregar aquí la lógica para seguir comprando
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };

  const renderCourseContents = (course) => {
    switch (course?.id) {
      case "1":
        return (
          <>
            <p className="font font-semibold text-lg">Contenidos</p>
            <ul>
              <li className="text-gray-800"> • Qué son los registros Akáshicos.</li>
              <li className="text-gray-800"> • Historia de la técnica.</li>
              <li className="text-gray-800"> • Objetivos de la técnica: ¿Para qué sirve una lectura de registros?</li>
              <li className="text-gray-800"> • Energías planetarias hoy: qué significa 3°, 4° y 5° dimensión, y los primeros delineamientos de la 6°. Física cuántica: nociones básicas</li>
              <li className="text-gray-800"> • Conexión con Akasha y la importancia de los 5 sentidos.</li>
              <li className="text-gray-800"> • Claridad en el mensaje y características de los mismos</li>
              <li className="text-gray-800"> • Perfil del lector.</li>
            </ul><br />
            <p className="font font-semibold text-sm">1° nivel – Prácticas para la Certificación</p>
            <p>Incluye <br />
Oración Sagrada, liberación de creencias y conductas para optimizar nuestro “ser canal”, recalibración energética y práctica: la primera apertura se hace en la clase.
</p><br />

<p className="font font-semibold text-sm ">2° nivel - Prácticas para la Certificación</p>
<p>Luego de cursar el 1° nivel y tener una cierta práctica se puede realizar el 2° nivel de Registros Akáshicos para aprender a abrir registros de otros.</p><br />
<ul>
              <li className="text-gray-800"> • Repaso de contenidos teóricos que sean necesarios</li>
              <li className="text-gray-800"> • Ejercicios para potenciar el/los sentidos con los que recibimos las canalizaciones</li>
              <li className="text-gray-800"> • Ejercicios de recalibración energética: para qué sirven y en qué circunstancias ofrecerlos</li>
              <li className="text-gray-800"> • Responsabilidad del lector: pautas, qué se recomienda y qué no</li>
             
            </ul>
          </>
        );
      case "2":
        return (
          <>
            <p className="font font-semibold text-2xl">Contenidos</p>
            <ul>
              <li className="text-gray-800">Breve historia de la técnica: su origen está en la kinesiología.</li>
              <li className="text-gray-800">Objetivo de la técnica: conflicto desencadenante.</li>
              <li className="text-gray-800">Tono muscular: qué es.</li>
              <li className="text-gray-800">Sistemas de comunicación con el cuerpo: Si y No - Mudanza de Indicador</li>
              <li className="text-gray-800">Rol del testeador: cuando el protagonista es el consultante</li>
              <li className="text-gray-800">Importancia de la carpeta para testear y el “botiquín” del facilitador (elementos de testeo)</li>
              <li className="text-gray-800">Etapas de un testeo: Pre-test, rueda china y testeo en sí</li>
              <li className="text-gray-800">Herramientas del Pre-Test: cuerpos y chakras</li>
              <li className="text-gray-800">Rueda China: Trabajo en 6º dimensión. Los 5 elementos: nociones básicas de medicina china</li>
              <li className="text-gray-800">Herramientas del Testeo en sí: chakras y cuerpos (se incluyen también), meridianos, hidratación, timo, ionización, hioides, oídos, ojos, esencias florales, visualización, símbolos, viaje por el cuerpo, fijación, punto universal, flujo de energía arterio-venosa</li>
            </ul>
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
              src={course?.contents}
              autoPlay
              
              alt={course?.nombre}
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
                      $199.99{" "}
                    </span>

                    <span className="text-green-600 md:text-xl text-sm ml-4 font-bold font-custom">
                      ${course?.precio}
                    </span>
                  </div>
                </div> 
                <div className="flex mt-4  justify-start">
                  <button
                    onClick={() => handleBuyClick(course)}
                    className="font-bold bg-bgla hover:bg-blue-600 text-white font-bold w-28 h-8 rounded-full"
                  >
                    Comprar
                  </button>
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

export default DetailCourse;
