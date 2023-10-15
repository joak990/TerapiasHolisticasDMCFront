import React, { useState, useEffect } from "react";
import logogira from '../img/logosinfondo.png';
import { useDispatch } from "react-redux";
import { validateotp } from "../Redux/Actions";
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';

function VerifiedRegister() {
  const [code, setCode] = useState(["", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutos en segundos
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email } = useParams();
  const { name } = useParams();

  console.log(name, "email che");

  const handleCodeChange = (event, index) => {
    const value = event.target.value;

    // Verificar que el valor sea un dígito y limitar la longitud a 1
    if (/^\d$/.test(value) && index >= 0 && index <= 3) {
      const updatedCode = [...code];
      updatedCode[index] = value;
      setCode(updatedCode);
    }
  };

  const joinCode = () => {
    return parseInt(code.join(""), 10);
  };

  useEffect(() => {
    if (timeLeft > 0) {
      const countdown = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => {
        clearInterval(countdown);
      };
    }
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const handleSubmit = () => {
    const verificationCode = joinCode();
    const formData = {
      email: email,
      code: verificationCode,
    };

    // Restablece el tiempo restante a 2 minutos al verificar
    setTimeLeft(120);

    dispatch(validateotp(formData))
    .then((response) => {
      if (response.status === 'approved') {
        localStorage.setItem("email", email);
        localStorage.setItem("name", name);
        Swal.fire({
          title: 'Registro Exitoso',
          icon: 'success',
          buttonsStyling: false,
          customClass: {
            confirmButton: 'bg-bgla text-white rounded-md px-4 py-2',
          },
        });
        navigate("/");
      } else if (response.status === 'declined') {
        Swal.fire({
          title: 'El código es incorrecto!',
          icon: 'error',
          buttonsStyling: false,
          customClass: {
            confirmButton: 'bg-orange-600 text-white rounded-md px-4 py-2',
          },
        });
        setCode(["", "", "", ""]);
      }
    })
    .catch((error) => {
      // Maneja errores aquí si es necesario
      console.error('Error:', error);
    });
  };

  return (
    <div className="w-full  max-w-md mx-auto mt-16 bg-blue-50">
      <div className="flex justify-center mt-10">
        <img src={logogira} alt="imagen" className="w-44 h-44 animate-spin-slow" />
      </div>
      <div className="bg-white shadow-md shadow-blue-200 flex justify-center flex-col rounded px-8 pt-6 pb-8 mb-4 bg-blue-50">
        <h2 className="text-2xl font-bold text-center mb-4">Verificación de Registro</h2>
        <p className="text-center mb-4">
          Se ha enviado un <span className="font-bold">código</span> a su bandeja de entrada. Por favor, ingréselo a continuación.
        </p>
        <div className="mb-4 flex justify-center">
          {code.map((digit, index) => (
            <input
              key={index}
              type="text"
              name={`code-${index}`}
              value={digit}
              onChange={(e) => handleCodeChange(e, index)}
              className="w-12 border border-gray-300 rounded px-3 py-2 mx-1 text-center"
              placeholder="0"
              maxLength="1"
            />
          ))}
        </div>
        <div className="text-center">
          <div className="font-bold">
            Tiempo restante: {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </div>
          <button
            className="bg-bgla mt-4 text-white py-2 px-4 rounded hover-bg-blue-600"
            onClick={handleSubmit}
          >
            Verificar
          </button>
        </div>
      </div>
    </div>
  );
}

export default VerifiedRegister;
