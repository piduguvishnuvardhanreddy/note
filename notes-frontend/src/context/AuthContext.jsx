import {createContext, useState, useEffect} from "react"
import {getToken} from "../utils/auth"

export const AuthContext = createContext()

const AuthProvider = ({children}) => {

  const [isAuth, setIsAuth] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const token = getToken()

    if(token){
      setIsAuth(true)
    }else{
      setIsAuth(false)
    }

    setLoading(false)

  },[])

  const value = {
    isAuth,
    setIsAuth
  }

  if(loading){
    return <div>Loading...</div>
  }

  return(
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider