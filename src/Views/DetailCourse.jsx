import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Rating from "react-rating-stars-component";

function DetailCourse() {
  const { id } = useParams();
  const courses = useSelector((state) => state.courses);
  const course = courses.find((course) => course.id === id);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleCommentSubmit = () => {
    console.log("Calificación:", rating);
    console.log("Comentario:", comment);
    setRating(0);
    setComment("");
  };

  return (
    <div className="mt-44 mx-2 sm:mx-4 lg:mx-8">
      {course ? (
        <div className="bg-white rounded-lg shadow-xl shadow-purple-200 p-4 sm:p-6 lg:p-8 sm:flex">
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
            <div className="mb-4">
              <label htmlFor="comment" className="block text-gray-600">
                Comentar:
              </label>
              <textarea
                id="comment"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                rows="4"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
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
                onChange={setRating}
                size={30}
                activeColor="#ffd700"
              />
            </div>
            <button
              onClick={handleCommentSubmit}
              className="bg-blue-500 text-white font-bold px-4 py-2 rounded-full hover:bg-blue-600 mt-4"
            >
              Enviar Comentario
            </button>
          </div>
        </div>
      ) : (
        <p className="text-red-500 mt-4">Curso no encontrado</p>
      )}
    </div>
  );
}

export default DetailCourse;
