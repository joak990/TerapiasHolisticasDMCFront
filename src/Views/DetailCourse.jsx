import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Rating from "react-rating-stars-component";
import Swal from 'sweetalert2';
import { createcomment, getAllComments, getallcourses } from "../Redux/Actions";

function DetailCourse() {
  const { id } = useParams();


  const courses = useSelector((state) => state.courses);
  const allcomments = useSelector((state) => state.allComents);
  const course = courses?.find((course) => course.id === id);
const namelocal = localStorage.getItem("name")
  const iduser = localStorage.getItem("id")
  const dispatch = useDispatch()
  const [rating, setRating] = useState(0);
  const [errors, setErrors] = useState({});
  const [isRecaptchaValid, setRecaptchaValid] = useState(false);
  const [isFormSubmitted, setFormSubmitted] = useState(false);
  const [newComment, setNewComment] = useState("")


  useEffect(() => {
    dispatch(getallcourses())
    dispatch(getAllComments(id))


  }, [dispatch,])

  const [form, setForm] = useState({
    id: iduser,
    curso: course.id,
    Contenido: "",
    rating: ""
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

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    const newErrors = {};


    if (!form.Contenido.trim()) {
      newErrors.Contenido = "El mensaje no puede estar vacio";
    } else if (form.Contenido.length < 6) {
      newErrors.Contenido = "El mensaje  debe tener al menos 10 caracteres";
    } else if (form.Contenido.length > 400) {
      newErrors.Contenido = "El mensaje debe tener como máximo 400 caracteres";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      dispatch(createcomment(form))
      Swal.fire({
        title: 'Comentario enviado',
        icon: 'success',
        buttonsStyling: false,
        customClass: {
          confirmButton: 'bg-orange-600 text-white rounded-md px-4 py-2',
        }
      })

      setNewComment(form.Contenido);
      setForm({
        Contenido: "",
        Rating: "",
        id: "",
        curso: ""
      });

    dispatch(getAllComments(id))
    }
   


  };

  return (
    <div className="mt-44 mx-2 sm:mx-4 lg:mx-8">
      {course ? (
        <div className="bg-white rounded-lg shadow-xl shadow-blue-200 p-4 sm:p-6 lg:p-8 sm:flex">
          <div className="mb-4 sm:w-1/2 sm:mr-4 lg:w-1/3 lg:mr-6">
            <img
              src={course.imagen}
              alt={course.nombre}
              className="w-full rounded-lg border border-purple-600"
            />
            <div className="mt-2 sm:mt-4">
              <div className="sm:ml-2">
                <Rating
                  name="rating"
                  count={5}
                  value={4.5}
                  edit={false}
                  size={30}
                  activeColor="#ffd700"
                />

                <span className="text-red-500 text-lg ml-4 line-through"> $199.99 </span>

                <span className="text-green-600 text-xl ml-4  font-bold font-custom">
                  ${course.precio}
                </span>
              </div>
              <p className="text-center text-gray-600 sm:text-left mt-4">
                ¿Quieres comprar este curso? <a href="/">Haz clic aquí</a>.
              </p>
            </div>
          </div>
          <div className="sm:w-1/2 sm:ml-4 lg:w-2/3 lg:ml-6">
            <h1 className="text-2xl font-bold mb-4">{course.nombre}</h1>
            <p className="text-gray-700 mb-4">{course.descripcion}</p>
            <div className="flex items-center justify-between mb-4">

            </div>
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
              </div>
              <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white font-bold px-4 py-2 rounded-full hover:bg-blue-600 mt-4"
              >
                Enviar Comentario
              </button>
            </form>
          </div>

        </div>

      ) : (
        <p className="text-red-500 mt-4">Curso no encontrado</p>

      )}
      <div className="mt-20">
        <h1 className="text-2xl font-bold text-center">Comentarios</h1>
        {allcomments && allcomments.length > 0 ? (
          allcomments.map((el, index) => (
            <div className="mt-4  md:ml-4 p-4 rounded-lg border border-gray-300 md:border-none" key={index}>
              <h2 className="font-semibold text-xl">{el.User.name}</h2>
              <div className="flex items-center">
                <Rating
                  name={`rating_${index}`}
                  count={5}
                  value={parseFloat(el.rating)}
                  edit={false}
                  size={30}
                  activeColor="#ffd700"
                />
              </div>
              <p className="mt-2 text-gray-700">{el.Contenido}</p>
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
            <h2 className="font-semibold text-xl">{namelocal}</h2> {/* Reemplaza "Tu Nombre" con el nombre del usuario actual */}
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
