import React, { useContext, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

import AuthContext from '../context/auth/authContext'

const Header = () => {

  let navigate = useNavigate()

  // extraer la información del usuario autenticado
  const { autenticado, usuarioAutenticado, logout } = useContext(AuthContext)

  useEffect(() => {
    usuarioAutenticado()
  }, [])

  const cerrarSesion = () => {
    logout();
    navigate('/login')
  }


  return (
    <div className="header__flex contenedor">
      <div className="header__logo">
        <h2 className="logo">MernAuth</h2>
      </div>
      <nav className="header__nav">
        {
          autenticado
          ? (
            <button 
              className="button-logout"
              onClick={() => cerrarSesion()}
            >Cerrar sesión</button>
          )
          : (
            <>
              <NavLink 
                to='/login'
                className={ ({ isActive }) => isActive ? 'active' : undefined }
              >Login</NavLink>
              <NavLink 
                to='/signup'
                className={ ({ isActive }) => isActive ? 'active' : undefined }
              >Signup</NavLink>
            </>
          )
        }

      </nav>
    </div>
  )
}

export default Header