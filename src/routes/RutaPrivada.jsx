import React from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import AuthContext from '../context/auth/authContext'



const RutaPrivada = () => {
  const { autenticado, cargando, usuarioAutenticado } = useContext(AuthContext)

  useEffect(() => {
    usuarioAutenticado()
  }, [])

  return (
    autenticado ? <Outlet/> : !cargando && <Navigate to='/login' />
  )
}

export default RutaPrivada
