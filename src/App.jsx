
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './Views/Login'
import Register from './Views/Register'
import Home from './Views/Home'
import MyCourses from './Views/MyCourses'
import Courses from './Views/Courses'

function App() {

  return (
    
    <div>
      <BrowserRouter>
      <Routes><Route path='/login' element={<Login/>}></Route></Routes>
      <Routes><Route path='/register' element={<Register/>}></Route></Routes>
      <Routes><Route path='/' element={<Home/>}></Route></Routes>
      <Routes><Route path='/mycourses' element={<MyCourses/>}></Route></Routes>
      <Routes><Route path='/courses' element={<Courses/>}></Route></Routes>
      </BrowserRouter>
    </div>
    
  )
}

export default App
