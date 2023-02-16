import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LogIn from '../pages/Auth/login'
import Register from '../pages/Auth/Register'
import Home from '../pages/Home'
import AddPatient from '../pages/Reception/addPatient'

const AppRoutes = () => {
  return (
    <>
       <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/Reception/addPatient' element={<AddPatient />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<LogIn/>} />
        </Routes> 
    </>
  )
}

export default AppRoutes