import React from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Main from './pages/Main'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'

const AppRoutes = () => {
  return (
    <>
      <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>}>
                      <Route index element={<Main/>}/>
                      <Route path='profile/:id' element={<Profile/>}/>
                </Route>
                <Route path='login' element={<Login/>}/>
                <Route path='register' element={<Register/>}/>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default AppRoutes
