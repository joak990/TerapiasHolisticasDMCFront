import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Login from './Views/Login';
import Register from './Views/Register';
import Home from './Views/Home';
import MyCourses from './Views/MyCourses';
import Courses from './Views/Courses';
import Navbar from './Components/Navbar';
import Sobremi from './Views/Sobremi';

function App() {
  const location = useLocation();


  return (
    <>

 {location.pathname !== "/register" 
      && location.pathname !== "/login"
      && location.pathname !== "*" &&(
        <Navbar />
      )}

      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Home />} />
        <Route path='/mycourses' element={<MyCourses />} />
        <Route path='/courses' element={<Courses />} />
        <Route path='/mycourses' element={<MyCourses />} />
        <Route path='/me' element={<Sobremi />} />
      </Routes>
      
      </>
    
  );
}

export default App;

