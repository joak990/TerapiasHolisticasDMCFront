import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Login from "./Views/Login";
import Register from "./Views/Register";
import Home from "./Views/Home";
import MyCourses from "./Views/MyCourses";
import Courses from "./Views/Courses";
import Navbar from "./Components/Navbar";
import Sobremi from "./Views/Sobremi";
import Contact from "./Views/Contact";
import logowp from "./img/wplogo2.png";
import ModalCarrito from "./Components/ShoppingCartModal";
import { useState } from "react";
import PlayMyCourses from "./Views/PlayMyCourses";
import PaypalButton from "./Components/PaypalButton";
import Success from "./Views/Success";
import DetailCourse from "./Views/DetailCourse";
import Loading from "./Components/Loading";
import Error from "./Views/Error";
import VerifiedRegister from "./Views/VerifiedRegister";
import Recovery from "./Views/Recovery";
function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/register" && location.pathname !== "/login" && (
        <div className="fixed z-50  bottom-4 right-4">
          <a
            href="https://web.whatsapp.com/send?phone=5491159482032"
            target="_blank"
            rel="noopener noreferrer"
            className="  p-4 rounded-full "
          >
            <img
              src={logowp}
              alt="WhatsApp"
              className=" w-12 md:w-15 h-12 md:h-12"
            />
          </a>
        </div>
      )}
      {location.pathname !== "/register" &&
        !location.pathname.match(/^\/verified\/[a-zA-Z0-9@._-]+/) &&
        location.pathname !== "/load" &&
        location.pathname !== "/recovery" &&
        location.pathname !== "/error" &&
        location.pathname !== "/success" &&
        location.pathname !== "/login" &&
        location.pathname !== "*" && <Navbar />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/mycourses" element={<MyCourses />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/mycourses" element={<MyCourses />} />
        <Route path="/me" element={<Sobremi />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/myshop" element={<ModalCarrito />} />
        <Route path="/playcourse/:courseId" element={<PlayMyCourses  />} />
        <Route path="/success" element={<Success />} />
        <Route path="/paypal" element={<PaypalButton />} />
        <Route path="/:id" element={<DetailCourse />} />
        <Route path="/verified/:email/:name*" element={<VerifiedRegister />} />
        <Route path="/recovery" element={<Recovery />} />
        <Route path="/error" element={<Error />} />
        <Route path="/load" element={<Loading />} />
      </Routes>
    </>
  );
}

export default App;
