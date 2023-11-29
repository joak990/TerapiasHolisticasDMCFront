import { NEXT_PAGE, PREV_PAGE, GET_ALL_COURSES, GET_ALL_MY_COURSES, LOGIN_REGISTER, REGISTER_BASIC, GET_COURSES_VIDEOS, REGISTER_GOOGLE, REMOVE_FROM_CART, UPDATE_CART_FROM_LOCAL_STORAGE, ADD_TO_CART, ALL_COMMENTS , ALL_BOOKS} from "./types";

const initialState = {
  courses: [],
  mycoursesvideos: [],
  mycourses: [],
  numPage: 1,
  allComents: [],
  books : [],
  cart: JSON.parse(localStorage.getItem("cart")) || [],
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REGISTER_BASIC:
      return {
        ...state,
      };
    case REGISTER_GOOGLE:
      return {
        ...state,
      };
    case LOGIN_REGISTER:
      return {
        ...state,
      };
    case ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, payload],
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== payload),

      };

    case UPDATE_CART_FROM_LOCAL_STORAGE:
      return {
        ...state,
        cart: payload,// Actualiza el carrito con los datos de localStorage
      };
    case GET_ALL_COURSES:
      return {
        ...state,
        courses: payload
      };
    case GET_COURSES_VIDEOS:
      return {
        ...state,
        mycoursesvideos: [...payload]
      };
    case GET_ALL_MY_COURSES:
      return {
        ...state,
        mycourses: [...payload],
      };
    case NEXT_PAGE:
      return {
        ...state,
        numPage: state.numPage + 1,
      };
    case PREV_PAGE:
      return {
        ...state,
        numPage: state.numPage - 1,
      };
    case ALL_COMMENTS:
      return {
        ...state,
        allComents: [...payload],
      };
      case ALL_BOOKS:
      return {
        ...state,
        books: [...payload],
      };
    default:
      return state;
  }
};

export default rootReducer;
