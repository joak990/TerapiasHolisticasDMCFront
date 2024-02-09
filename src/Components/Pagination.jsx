import { useDispatch, useSelector } from "react-redux";
import { nextPage, prevPage } from "../Redux/Actions";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

const Pagination = ({ cantPages }) => {
  const { numPage } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { courseId } = useParams();

  function next() {
    if (numPage < cantPages) {
      dispatch(nextPage());
    }
  }

  function prev() {
    if (numPage > 1) {
      dispatch(prevPage());
    }
  }

  // Función para construir el enlace del PDF basado en el parámetro de la URL
  const buildPdfLink = (courseId) => {
    // Modifica las lógicas según tus necesidades
    switch (courseId) {
      case "1":
        return "https://drive.google.com/file/d/1VpkyO6rEDLcKMhpUlLHt3YbBfs7GmTE2/view?usp=drive_link";
      case "2":
        return "https://drive.google.com/file/d/1cTWpP-hlnukUGuNzrndqksmnjKfTtBWk/view?usp=sharing";
      case "3":
        return "https://drive.google.com/file/d/1026ClPgUc771Wm3w9BUfELsPnIhaM4Jl/view?usp=drive_link";
      case "4":
        return "https://drive.google.com/file/d/11e0LSbtHZRzJv0pDo8ErIdvpgTkwm4v8/view?usp=drive_link";
      default:
        return "";
    }
  };

  const pdfLink = buildPdfLink(courseId);

  return (
    <div className="flex flex-col items-center mt-16">
      <button className="mb-4 bg-blue-500 text-white px-4 py-2 rounded-md">
        <a href={pdfLink} target="_blank" rel="noopener noreferrer">
          Descargar PDF Teórico
        </a>
      </button>

      <div className="flex">
        <button
          className="mr-4 w-20 md:w-24 h-12 text-blue-300 rounded-xl font-bold"
          onClick={prev}
          disabled={numPage === 1}
        >
          Anterior
        </button>

        <div className="text-xl font-bold">
          <h3 className="text-blue-300  shadow-xl">{numPage}</h3>
        </div>

        <button
          className="ml-4 w-20 md:w-24 h-12 text-blue-300 rounded-xl font-bold"
          onClick={next}
          disabled={numPage === cantPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  cantPages: PropTypes.number.isRequired,
};

export default Pagination;