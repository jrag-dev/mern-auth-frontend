import React, {useContext, useEffect} from "react"
import AuthContext from "../context/auth/authContext"


const Home = () => {

  // extraer la información del usuario autenticado
  const { usuario, usuarioAutenticado } = useContext(AuthContext)

  useEffect(() => {
    usuarioAutenticado()
  }, [])
  

  return (
    <div>
      {
        usuario ? <h2>Bienvenido: {usuario.name}</h2> : null
      }
      
    </div>
  )
}

export default Home
Home