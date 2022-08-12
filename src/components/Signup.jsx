import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import AlertaContext from '../context/alertas/alertaContext';
import AuthContext from '../context/auth/authContext'


const initialForm = {
  name: '',
  email: '',
  password: '',
  confirmar: ''
}

const Signup = () => {

  let navigate = useNavigate()

  const { mensaje, autenticado, signup } = useContext(AuthContext)
  const { alerta, mostrarAlerta } = useContext(AlertaContext)

  const [dataForm, setDataForm] = useState(initialForm)

  const { name, email, password, confirmar } = dataForm


  // En caso de que el usuario se haya autenticado o registrado o sea un registro 

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

    if (name.trim() === '' || email.trim() === '' || password.trim() === '' || confirmar.trim() === '') {
      mostrarAlerta('Todos los campos son obligatorios!', 'alerta-error')
      return;
    }

    if ( password.length < 6) {
      mostrarAlerta('El password debe contener al menos 6 caracteres!', 'alerta-error')
      return;
    }

    if (password.trim() !== confirmar.trim()) {
      mostrarAlerta('Los password no son iguales!', 'alerta-error')
      return;
    }


    signup(dataForm)
    setDataForm(initialForm)

  }

  return (
    <article className="form">
      <form
        onSubmit={handleSubmit}
      >
        <h2>Signup</h2>
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
          <label htmlFor="name">Name:</label>
          <input 
            type="text"
            name="name"
            id="name"
            className="input"
            placeholder="Enter your name"
            onChange={handleChange}
            value={name}
          />
        </div>
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
        <div className="campo">
          <label htmlFor="confirmar">Confirmar Password :</label>
          <input 
            type="password"
            name="confirmar"
            id="confirmar"
            className="input"
            placeholder="Confirma tu password"
            onChange={handleChange}
            value={confirmar}
          />
        </div>
        <button className="button-auth">Signup</button>
      </form>
    </article>
  )
}

export default Signup