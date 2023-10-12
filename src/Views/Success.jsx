import React from 'react';
import { Link } from 'react-router-dom';
import logogira from '../img/logosinfondo.png'
import { sendpayament } from '../Redux/Actions';
import { useDispatch } from 'react-redux';
function Success() {

  const currentURL = window.location.href;
  const orderData = localStorage.getItem('orderdata');
// Analiza los parámetros de la URL
const urlParams = new URLSearchParams(currentURL);
const dispatch = useDispatch()
// Extrae los valores de los parámetros que necesitas
const collectionId = urlParams.get('collection_id');
const paymentId = urlParams.get('payment_id');
const status = urlParams.get('status');
const preferenceId = urlParams.get('preference_id');
const transactionData = {
  collectionId,
  paymentId,
  preferenceId,
  status
  // Agrega otros datos aquí si es necesario
};



  if(orderData){
    const datashop = JSON.parse(orderData)
    if(status === "approved"){
      dispatch(sendpayament(datashop))
      localStorage.removeItem("orderdata")
      localStorage.removeItem("cart")
    }
  }
  



  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="mt-8">
        <img src={logogira} alt="imagen" className="w-44 h-44 animate-spin-slow" />
      </div>
      <div className="text-3xl font-bold text-green-600 text-center">
        ¡Gracias por realizar tu compra!
      </div>
      <div className="mt-8">
        <Link to="/" className="bg-bgla hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Ir al Inicio
        </Link>
      </div>
      
    </div>
  );
}

export default Success;