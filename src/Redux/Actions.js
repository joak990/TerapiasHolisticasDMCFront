import axios from "axios";
import Swal from 'sweetalert2';
import { REGISTER_BASIC, UPDATE_CART_FROM_LOCAL_STORAGE } from "./types";

export const registerbasic = (payload) => {
    console.log('::payloadUSERS:', payload);
    return async function (dispatch) {
        try {
            // Realizar la solicitud POST a /users con el payload
            const response = await axios.post('http://localhost:3001/users', payload);
console.log(response.data.duplicated,"register");
if (response.data.duplicated == true) {
  Swal.fire({
    icon: 'error', // Cambiado de 'success' a 'error'
    title: 'Ya tienes una cuenta registrada con este correo',
    text: 'Hubo un problema al registrar el usuario.',
});
}
if(response.data.duplicated == undefined){
  Swal.fire({
    icon: 'success',
    title: 'Registro exitoso',
    text: 'El usuario se registró correctamente.',
});
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
  
        const response = await axios.post("http://localhost:3001/users", payload);
  
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
  
        const response = await axios.post("http://localhost:3001/validate", payload);
   
        if (response.data === false) {
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
  export const removeFromCart = (item) => ({
    type: 'REMOVE_FROM_CART',
    payload: item,
  });
  
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