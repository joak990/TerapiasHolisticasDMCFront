import { useDispatch, useSelector } from "react-redux";
import { nextPage, prevPage } from "../redux/actions";
import PropTypes from "prop-types";

const Pagination = ({ cantPages }) => {
  const { numPage } = useSelector((state) => state);
  const dispatch = useDispatch();

  function next() {
    dispatch(nextPage());
  }
  function prev() {
    dispatch(prevPage());
  }

  return (
    <div className="flex justify-center items-center mt-16">
      {numPage > 1 ? (
        <div className="mr-4">
          <button
            className="bg-bgla w-20 md:w-24 h-12 text-white rounded-xl font-bold"
            onClick={prev}
          >
            PREV
          </button>
        </div>
      ) : null}
      <div className="text-xl font-bold">
        <h3>{numPage}</h3>
      </div>
      {numPage < cantPages ? (
        <div className="ml-4">
          <button
            className="bg-bgla w-20 md:w-24 h-12 text-white rounded-xl font-bold"
            onClick={next}
          >
            NEXT
          </button>
        </div>
      ) : null}
    </div>
  );
};

Pagination.propTypes = {
    cantPages: PropTypes.number.isRequired,

};

export default Pagination;
