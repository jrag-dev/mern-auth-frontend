import React from 'react'
import { useReducer } from 'react'
import clienteAxios from '../../config/axios'
import AuthContext from './authContext'
import authReducer from './authReducer'



import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  OBTENER_USUARIO,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  CERRAR_SESION
} from '../../types'
import tokenAuth from '../../config/tokenAuth'


const AuthState = ({ children }) => {

  const initialState = {
    token: localStorage.getItem('token'),
    autenticado: null,
    usuario: null,
    mensaje: null,
    cargando: true
  }

  const [state, dispatch] = useReducer(authReducer, initialState)

  //Todo: Funciones que cambiarán el state de autenticación

  const signup = async (datos) => {
    try {
      const respuesta = await clienteAxios.post('/user/signup', datos)

      console.log('paso 1')

      dispatch({
        type: REGISTRO_EXITOSO,
        payload: respuesta.data.token
      })

      // Obtener el usuario autenticado
      console.log('paso 2')
      usuarioAutenticado()

      console.log('paso 3')
      
    } catch (error) {
      console.log(error.response.data.mjs)

      const alerta = {
        mjs: error.response.data.mjs,
        categoria: 'alerta-error'
      }

      dispatch({
        type: REGISTRO_ERROR,
        payload: alerta
      })
    }
  }


  const usuarioAutenticado = async () => {
    console.log('paso 7')
    const token = localStorage.getItem('token')

    console.log('paso 8: ', token)

    if (token) {
      // TODO: Función para enviar el token por headers
      console.log('paso 9')
      tokenAuth(token)
    }

    console.log('paso 10')

    try {
      const respuesta = await clienteAxios.get('/user')

      dispatch({
        type: OBTENER_USUARIO,
        payload: respuesta.data
      })
      
    } catch (error) {
      console.log(error)

      dispatch({
        type: LOGIN_ERROR
      })
    }
  }

  const login = async (datos) => {
    try {
      const respuesta = await clienteAxios.post('/user/login', datos)

      console.log('paso 4')

      dispatch({
        type: LOGIN_EXITOSO,
        payload: respuesta.data.token
      })

      // Obtener el usuario autenticado
      console.log('paso 5')
      usuarioAutenticado()
      console.log('paso 6')
      
    } catch (error) {
      console.log(error.response)

      const alerta = {
        mjs: error.response.data.mjs,
        categoria: 'alerta-error'
      }

      dispatch({
        type: LOGIN_ERROR,
        payload: alerta
      })
    }
  }


  const logout = () => {
    dispatch({
      type: CERRAR_SESION
    })
  }

  const datos = {
    autenticado: state.autenticado,
    usuario: state.usuario,
    mensaje: state.mensaje,
    cargando: state.cargando,
    signup,
    login,
    usuarioAutenticado,
    logout
  }

  return (
    <AuthContext.Provider value={datos}>
      { children }
    </AuthContext.Provider>
  )
}

export default AuthState
