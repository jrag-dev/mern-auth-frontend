
import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  OBTENER_USUARIO,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  CERRAR_SESION
} from '../../types'


export default (state, action) => {
  switch (action.type) {
    case LOGIN_EXITOSO:
    case REGISTRO_EXITOSO:
      localStorage.setItem('token', action.payload)
      console.log('paso 11: ')
      return {
        ...state,
        token: localStorage.getItem('token'),
        autenticado: true,
        mensaje: null,
        cargando: null
      }
    case LOGIN_ERROR:
    case REGISTRO_ERROR:
      //localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        mensaje: action.payload,
        autenticado: null,
        cargando: null,
        usuario: null
      }
    case OBTENER_USUARIO:
      return {
        ...state,
        usuario: action.payload,
        autenticado: true,
        cargando: null
      }
    case CERRAR_SESION:
      localStorage.removeItem('token')
      return {
        ...state,
        autenticado: null,
        token: null,
        usuario: null,
        cargando: null
      }
    
    default:
      return state
  }
}