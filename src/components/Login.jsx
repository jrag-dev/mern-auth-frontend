import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import AlertaContext from '../context/alertas/alertaContext';
import AuthContext from '../context/auth/authContext'



const initialForm = {
  email: '',
  password: ''
}

const Login = () => {

  let navigate = useNavigate()

  const { mensaje, autenticado, login } = useContext(AuthContext)
  const { alerta, mostrarAlerta } = useContext(AlertaContext)

  const [dataForm, setDataForm] = useState(initialForm)

  const { email, password } = dataForm


  useEffect(() => {
    if (autenticado) {
      navigate('/')
    }

    if (mensaje) {
      mostrarAlerta(mensaje.mjs, mensaje.categoria)
      return;
    }
  }, [mensaje, autenticado])


  const handleChange = e => {
    setDataForm({
      ...dataForm,
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault()

    if ( email.trim() === '' || password.trim() === '') {
      mostrarAlerta('Todos los campos son obligatorios!', 'alerta-error')
      return;
    }

    login(dataForm)
    setDataForm(initialForm)

  }

  return (
    <article className="form">
      <form
        onSubmit={handleSubmit}
      >
        <h2>Login</h2>
        {
          alerta
          ? (
            <div className={`${alerta.categoria}`}>
              <p>{alerta.mjs}</p>
            </div>
          )
          : null
        }
        <div className="campo">
          <label htmlFor="email">Email:</label>
          <input 
            type="email"
            name="email"
            id="email"
            className="input"
            placeholder="Enter your email"
            onChange={handleChange}
            value={email}
          />
        </div>
        <div className="campo">
          <label htmlFor="password">Password:</label>
          <input 
            type="password"
            name="password"
            id="password"
            className="input"
            placeholder="Enter your password"
            onChange={handleChange}
            value={password}
          />
        </div>
        <button className="button-auth">Login</button>
      </form>
    </article>
  )
}

export default Login