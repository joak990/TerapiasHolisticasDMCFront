import axios from "axios";
import Swal from 'sweetalert2';
import {
  ALL_COMMENTS,
  PREV_PAGE,
  NEXT_PAGE,
  GET_ALL_COURSES,
  GET_ALL_MY_COURSES,
  REGISTER_BASIC,
  UPDATE_CART_FROM_LOCAL_STORAGE,
  GET_COURSES_VIDEOS
} from "./types";

export const registerbasic = (payload) => {
  console.log('::payloadUSERS:', payload);
  return async function (dispatch) {
    try {
      // Realizar la solicitud POST a /users con el payload
      const response = await axios.post('http://localhost:3001/users', payload);
      console.log(response.data, "register");

      if (response.data.duplicated == true) {
        Swal.fire({
          icon: 'error', // Cambiado de 'success' a 'error'
          title: 'Ya tienes una cuenta registrada con este correo',
          text: 'Hubo un problema al registrar el usuario.',
        });
        return { status: "failed" }
      }
      console.log(response.data.duplicated);
      if (response.data.duplicated == undefined) {

        return { status: "approved" }
      }

      dispatch({
        type: REGISTER_BASIC,
        payload: response.data, // Puedes pasar datos de la respuesta si es necesario
      });
    } catch (error) {
      // Manejo de errores
      console.error('Error al registrar usuario:', error);

      // Puedes mostrar un mensaje de error con SweetAlert2 u otra librería
      Swal.fire({
        icon: 'error',
        title: 'Error al registrar usuario',
        text: 'Hubo un problema al registrar el usuario. Inténtalo de nuevo más tarde.',
      });

      // También puedes manejar errores específicos aquí y tomar medidas adecuadas
    }
  };
};

export const register_google = (payload) => {

  return async function (dispatch) {
    try {

      const response = await axios.post("https://terapias-holisticas-dmc-back.vercel.app/users", payload);
      console.log(payload, "pay");
      if (response.data === true) {
        return { success: false }
      } else {
        if (response.data.email && response.data.id && response.data.name) {
          // Autenticación exitosa
          // Puedes realizar acciones adicionales aquí, como guardar el token de autenticación en el estado global
          localStorage.setItem("email", response.data.email);
          localStorage.setItem("id", response.data.id);
          localStorage.setItem("name", response.data.name);
          localStorage.setItem("userLogin", JSON.stringify(response.data));

          Swal.fire({
            icon: 'success',
            title: 'Inicio de sesión correcto!',
            text: 'Haz iniciado sesión con exíto!',
          });

          return { success: true, email: response.data.email, id: response.data.id };
        } else {
          const errorMessage = response.data.message || "Error de autenticación";
          return { success: false, message: errorMessage };
        }
      }
    } catch (error) {
      // Error en la petición
      console.error(error);
      return { success: false, message: "Error de autenticación" };
    }
  };
};


export const Loginregister = (payload) => {

  return async function (dispatch) {
    try {
      console.log(payload);
      const response = await axios.post("http://localhost:3001/validate", payload);
      console.log(response.data, "responsedata");
      if (response.data.isDeleted === true) {
        Swal.fire({
          icon: 'error', // Cambiado de 'success' a 'error'
          title: 'Tu cuenta no esta verificada',
          text: 'Por favor verifica tu cuenta.',
        });

      } else if (response.data === false) {
        Swal.fire({
          icon: 'error',
          title: 'Inicio de sesión incorrecto!',
          text: 'Las Credenciales no son  validas!',
        });
      } else {

        if (response.data.email && response.data.id && response.data.name) {
          // Autenticación exitosa
          // Puedes realizar acciones adicionales aquí, como guardar el token de autenticación en el estado global
          localStorage.setItem("email", response.data.email);
          localStorage.setItem("id", response.data.id);
          localStorage.setItem("name", response.data.name);
          localStorage.setItem("userLogin", JSON.stringify(response.data));
          Swal.fire({
            icon: 'success',
            title: 'Inicio de sesión correcto!',
            text: 'Has iniciado sesión!',
          });


          return true
        } else {
          const errorMessage = response.data.message || "Error de autenticación";
          return { success: false, message: errorMessage };
        }
      }
    } catch (error) {
      // Error en la petición
      console.error(error);
      return { success: false, message: "Error de autenticación" };
    }
  };
};


export const addToCart = (item) => ({
  type: 'ADD_TO_CART',
  payload: item,
});

// Acción para eliminar un elemento del carrito
export const removeFromCart = (productId) => {
  console.log(productId, "ident");
  return {
    type: 'REMOVE_FROM_CART',
    payload: productId,
  };
};
// Acción para incrementar la cantidad de elementos en el carrito
export const incrementCartCount = () => ({
  type: 'INCREMENT_CART_COUNT',
});

// Acción para decrementar la cantidad de elementos en el carrito
export const decrementCartCount = () => ({
  type: 'DECREMENT_CART_COUNT',
});

export const updateCartFromLocalStorage = (cart) => {
  return {
    type: UPDATE_CART_FROM_LOCAL_STORAGE,
    payload: cart,
  };
};


export const getallcourses = () => {
  return async function (dispatch) {
    try {
      const json = await axios.get("https://terapias-holisticas-dmc-back.vercel.app/cursos");

      return dispatch({
        type: GET_ALL_COURSES,
        payload: json.data,
      });
    } catch (error) {
      Swal.fire({
        title: 'Error Courses',
        icon: 'error',
        buttonsStyling: false,
        customClass: {
          confirmButton: 'bg-orange-600 text-white rounded-md px-4 py-2',
        }
      })
      //alert(`Message ${GET_CREATIONS}:`, error);
    }
  };
};


export const sendpayament = (payload) => {

  return async function () {
    try {

      const response = await axios.post("https://terapias-holisticas-dmc-back.vercel.app/cursos/pago", payload)



    } catch (error) {
      // Error en la petición
      console.error(error);
      return { success: false, message: "Error de Pago" };
    }
  };
};

export const createcomment = (payload) => {

  return async function () {
    try {
      console.log(payload, "pay");
      const response = await axios.post("https://terapias-holisticas-dmc-back.vercel.app/comments", payload)

      console.log(response, "response");

    } catch (error) {
      // Error en la petición
      console.error(error);
      return { success: false, message: "Error al crear comentario" };
    }
  };
};

export const getmycourses = (id) => {

  return async function (dispatch) {
    try {
      console.log(id, "payloadgetMyCourses");
      const response = await axios.get(`http://localhost:3001/videos/${id}`)

      return dispatch({
        type: GET_COURSES_VIDEOS,
        payload: response.data,
      });
    } catch (error) {
      // Error en la petición
      console.error(error);
      return { success: false, message: "Error al obtener mis cursos-videos" };
    }
  };
};



export const getallmycourses = (payload) => {

  return async function (dispatch) {
    try {
      console.log(payload, "payloadgetMyCourses");
      const objectEmail = { email: payload }
      const response = await axios.post(`https://terapias-holisticas-dmc-back.vercel.app/cursos/miscursos`, objectEmail)

      return dispatch({
        type: GET_ALL_MY_COURSES,
        payload: response.data,
      });
    } catch (error) {
      // Error en la petición
      console.error(error);
      return { success: false, message: "Error al obtener mis cursos-videos" };
    }
  };
};

export function prevPage() {
  return {
    type: PREV_PAGE,
  };
}

export function nextPage() {
  return {
    type: NEXT_PAGE,
  };
}


export const getAllComments = (id) => {

  return async function (dispatch) {
    try {
      const response = await axios.post(`https://terapias-holisticas-dmc-back.vercel.app/all_comments/${id}`);

      return dispatch({
        type: ALL_COMMENTS,
        payload: response.data,
      });

    } catch (error) {
      // Error en la petición
      console.error(error);
      return { success: false, message: "Error de autenticación" };
    }
  };
};



export const validateotp = (payload) => {

  return async function () {
    try {
      console.log(payload, "pay");
      const response = await axios.post("http://localhost:3001/validateop", payload)

      console.log(response);
      if (response.data === true) {
        return { status: "approved" }
      } else return { status: "declined" }

    } catch (error) {
      // Error en la petición
      console.error(error);
      return { success: false, message: "Error al crear comentario" };
    }
  };
};




export const sendrecoverypass = (payload) => {

  return async function () {
    try {
      console.log(payload, "pay");
      const response = await axios.post("https://terapias-holisticas-dmc-back.vercel.app/send-recovery", payload)

      console.log(response);
      if (response.data === false) {
        Swal.fire({
          title: 'Email Incorrecto',
          icon: 'error',
          buttonsStyling: false,
          customClass: {
            confirmButton: 'bg-orange-600 text-white rounded-md px-4 py-2',
          }
        })
      } else if (response.data === true) {
        Swal.fire({
          title: 'Codigo de verificación enviado!',
          icon: 'success',
          buttonsStyling: false,
          customClass: {
            confirmButton: 'bg-bgla text-white rounded-md px-4 py-2',
          }
        })
        return { status: "approved" }
      }

    } catch (error) {
      // Error en la petición
      console.error(error);
      return { success: false, message: "Error al crear comentario" };
    }
  };
};


export const changepass = (payload) => {

  return async function () {
    try {
      console.log(payload, "pay");
      const response = await axios.put("https://terapias-holisticas-dmc-back.vercel.app/recovery", payload)
      console.log(response);
      if (response.data === true) {
        return { status: "approved" }
      }


    } catch (error) {
      // Error en la petición
      console.error(error);
      return { success: false, message: "Error al crear comentario" };
    }
  };
};




export const resendcode = (payload) => {

  return async function () {
    try {
      console.log(payload, "pay");
      const response = await axios.post("http://localhost:3001/resendcode", payload)
      if (response.data === true) {
        return { status: "approved" }
      } else {
        return false
      }

    } catch (error) {
      // Error en la petición
      console.error(error);
      return { success: false, message: "Error al el codigo" };
    }
  };
};
