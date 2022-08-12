import { useEffect, useContext } from 'react';
import { Route, Routes } from 'react-router-dom'

import Header from './components/Header'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'

import './App.css'

import AlertaState from './context/alertas/AlertaState'


import AuthContext from './context/auth/authContext'

import tokenAuth from './config/tokenAuth';
import RutaPrivada from './routes/RutaPrivada';

const App = () => {

  // Revisar si tenemos un token
  const token = localStorage.getItem('token')

  if (token) {
    tokenAuth(token)
  }

  return (
    <AlertaState>
      <header className="header">
        <Header/>
      </header>
      <main>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path='/' element={<RutaPrivada/>}>
            <Route path="/" element={<Home/>}/>
          </Route>
        </Routes>
      </main>
    </AlertaState>
  )
}

export default App
