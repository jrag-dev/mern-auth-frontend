import React, { useReducer } from 'react'
import AlertaContext from './alertaContext'
import alertaReducer from './alertaReducer'

import {
  MOSTRAR_ALERTA,
  OCULTAR_ALERTA
} from '../../types'

const AlertaState = ({ children }) => {

  const initialState = {
    alerta: null
  }

  const [state, dispatch] = useReducer(alertaReducer, initialState)

  // Funciones que cambiaran el state

  const mostrarAlerta = (mjs, categoria) => {
    dispatch({
      type: MOSTRAR_ALERTA,
      payload:  {
        mjs,
        categoria
      }
    })

    setTimeout(() => {
      dispatch({
        type: OCULTAR_ALERTA
      })
    }, 5000)
  }

  const datos = {
    alerta: state.alerta,
    mostrarAlerta
  }

  return (
    <AlertaContext.Provider value={datos}>
      { children }
    </AlertaContext.Provider>
  )
}

export default AlertaState
