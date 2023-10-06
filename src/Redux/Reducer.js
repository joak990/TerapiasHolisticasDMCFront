import { ADD_TO_CART, LOGIN_REGISTER, REGISTER_BASIC, REGISTER_GOOGLE, REMOVE_FROM_CART, UPDATE_CART_FROM_LOCAL_STORAGE } from "./types";

const initialState = {
  courses: [],
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
          cart: state.cart.filter(item => item.id !== payload.id), 
        };
        case UPDATE_CART_FROM_LOCAL_STORAGE:
      return {
        ...state,
        cart: payload,// Actualiza el carrito con los datos de localStorage
      };
    default:
      return state;
  }
};

export default rootReducer;
