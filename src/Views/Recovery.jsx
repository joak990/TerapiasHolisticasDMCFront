import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import logogira from "../img/logosinfondo.png";
import Swal from 'sweetalert2';
import { sendrecoverypass, validateotp, changepass } from "../Redux/Actions";
import Modal from 'react-modal';
import { useNavigate } from "react-router-dom";

Modal.setAppElement('#root');

function Recovery() {
  const [email, setEmail] = useState("");
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [code, setCode] = useState(["", "", "", ""]);
  const [password, setPassword] = useState(""); // Nueva contraseña
  const [repeatPassword, setRepeatPassword] = useState(""); // Repetir nueva contraseña
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutos en segundos
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleCodeChange = (event, index) => {
    const value = event.target.value;
    if (/^\d$/.test(value) && index >= 0 && index <= 3) {
      const updatedCode = [...code];
      updatedCode[index] = value;
      setCode(updatedCode);
    }
  };

  const handleSubmit = () => {
    const formData = {
      email: email,
      code: parseInt(code.join(""), 10),
    };

    dispatch(sendrecoverypass(formData))
    .then((response) => {
      if (response.status === 'approved') {
        setIsCodeModalOpen(true);
      }
    });
  };

  const closeModal = () => {
    setIsCodeModalOpen(false);
    setIsPasswordModalOpen(false);
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


  const handleSubmitCode = () => {
    
    const formData = {
      email: email,
      code: parseInt(code.join(""), 10),
    };

    dispatch(validateotp(formData))
    .then((response) => {
    
      if (response.status === "approved") {
        localStorage.setItem("code",parseInt(code.join(""), 10))
        setIsCodeModalOpen(false);
        setIsPasswordModalOpen(true);
      }else{
        Swal.fire({
            title: "El codigo ingresado es incorrecto!",
            icon: 'error',
            buttonsStyling: false,
            customClass: {
              confirmButton: 'bg-bgla text-white rounded-md px-4 py-2',
            }
          })
      }
    });
  };

  const handleSubmitChangePassword = () => {
    const codenum = localStorage.getItem("code")
    const code = parseInt(codenum, 10);
    console.log(code);
    if (password !== repeatPassword) {
      Swal.fire({
        title: 'Error',
        text: 'Las contraseñas no coinciden',
        icon: 'error',
      });
    } else {
      const formData = {
        email: email,
        password: password,
        code: code
      }

      dispatch(changepass(formData))
      .then((response) => {
        console.log(response);
      if(response.status==="approved"){
        Swal.fire({
            title: "La contraseña se modifico con exito!",
            icon: 'success',
            buttonsStyling: false,
            customClass: {
              confirmButton: 'bg-bgla text-white rounded-md px-4 py-2',
            }
          })
          navigate("/login")
          
      }
      });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-16 bg-blue-50">
      <div className="flex justify-center mt-10">
        <img src={logogira} alt="imagen" className="w-44 h-44 animate-spin-slow" />
      </div>
      <div className="bg-white shadow-md shadow-blue-200 flex justify-center flex-col rounded px-8 pt-6 pb-8 mb-4 bg-blue-50">
        <h2 className="text-2xl font-bold text-center mb-4">Recuperar Contraseña</h2>
        <p className="text-center mb-4">
          Ingresa tu dirección de correo electrónico y te enviaremos instrucciones para restablecer tu contraseña.
        </p>
        <div className="mb-4 flex justify-center">
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            className="w-full border border-gray-300 rounded px-3 py-2 text-center"
            placeholder="Tu correo electrónico"
          />
        </div>
        <div className="text-center">
          <button
            className="bg-bgla text-white py-2 px-4 rounded hover-bg-blue-600"
            onClick={handleSubmit}
          >
            Enviar Solicitud
          </button>
        </div>
      </div>

      <Modal
        isOpen={isCodeModalOpen}
        onRequestClose={closeModal}
        contentLabel="Código de Verificación"
      >
        <div className="w-full max-w-md mx-auto mt-16 bg-blue-50">
          <div className="flex justify-center mt-10">
            <img src={logogira} alt="imagen" className="w-44 h-44 animate-spin-slow" />
          </div>
          <div className="bg-white shadow-md shadow-blue-200 flex justify-center flex-col rounded px-8 pt-6 pb-8 mb-4 bg-blue-50">
            <h2 className="text-2xl font-bold text-center mb-4">Código de Verificación</h2>
            <p className="text-center mb-4">
              Ingresa el <span className="font-bold">código</span> que hemos enviado a tu bandeja de entrada.
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
            <div className="font-bold flex justify-center">
            Tiempo restante: {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </div>
            <button className="mt-4" onClick={handleSubmitCode}>Continuar</button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isPasswordModalOpen}
        onRequestClose={closeModal}
        contentLabel="Cambiar Contraseña"
      >
        <div className="w-full max-w-md mx-auto mt-16 bg-blue-50">
          <div className="flex justify-center mt-10">
            <img src={logogira} alt="imagen" className="w-44 h-44 animate-spin-slow" />
          </div>
          <div className="bg-white shadow-md shadow-blue-200 flex justify-center flex-col rounded px-8 pt-6 pb-8 mb-4 bg-blue-50">
            <h2 className="text-2xl font-bold text-center mb-4">Cambiar Contraseña</h2>
            <p className="text-center mb-4">
              Ingresa tu nueva contraseña y repítela para confirmar.
            </p>
            <div className="mb-4 flex justify-center">
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-center"
                placeholder="Nueva Contraseña"
              />
            </div>
            <div className="mb-4 flex justify-center">
              <input
                type="password"
                name="repeatPassword"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-center"
                placeholder="Repetir Nueva Contraseña"
              />
            </div>
            <button onClick={handleSubmitChangePassword}>Cambiar Contraseña</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Recovery;
