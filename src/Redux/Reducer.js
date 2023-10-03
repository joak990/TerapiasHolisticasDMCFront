import { REGISTER_BASIC, REGISTER_GOOGLE } from "./types";

const initialState = {
  courses: [], // Cambié "Courses" a "courses" para seguir las convenciones de nombres de JavaScript
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
    default:
      return state;
  }
};

export default rootReducer;
