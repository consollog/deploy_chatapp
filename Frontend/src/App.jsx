import './App.css'
import Login from "../src/pages/login/Login"
import Singup from './pages/singup/Singup'
import Home from './pages/home/Home'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from "react-hot-toast"
import { useAuthContext } from './Context/authContext'

function App() {
  const { authuser } = useAuthContext()
  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      <Routes>
        <Route path='/' element={authuser ? <Home /> : <Navigate to="/login" />} />
        <Route path='/login' element={authuser ? <Navigate to="/" /> : <Login />} />
        <Route path='/singup' element={authuser ? <Navigate to="/" /> : <Singup />} />
      </Routes>
      <Toaster />

    </div>
  )
}

export default App

