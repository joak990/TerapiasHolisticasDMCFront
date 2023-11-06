import { useDispatch, useSelector } from "react-redux";
import { nextPage, prevPage } from "../Redux/Actions";
import PropTypes from "prop-types";

const Pagination = ({ cantPages }) => {
  const { numPage } = useSelector((state) => state);
  const dispatch = useDispatch();

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

  return (
    <div className="flex justify-center items-center mt-16">
      <div className="mr-4">
        <button
          className=" w-20 md:w-24 h-12 text-black rounded-xl font-bold"
          onClick={prev}
          disabled={numPage === 1}
        >
          PREV
        </button>
      </div>
      <div className="text-xl font-bold">
        <h3 className="text-black shadow-xl" >{numPage}</h3>
      </div>
      <div className="ml-4">
        <button
          className=" w-20 md:w-24 h-12 text-black rounded-xl font-bold"
          onClick={next}
          disabled={numPage === cantPages}
        >
          NEXT
        </button>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  cantPages: PropTypes.number.isRequired,
};

export default Pagination;
