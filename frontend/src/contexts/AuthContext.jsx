import { createContext, useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'

export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [userId, setUserId] = useState()

  const saveToken = tokenFromLogin => {
    setToken(tokenFromLogin)
    setIsAuthenticated(true)
    window.localStorage.setItem('authToken', tokenFromLogin)
    const { userId } = jwtDecode(tokenFromLogin)
    setUserId(userId)
  }

  const verifyToken = async tokenFromLocalStorage => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/verify`, {
        headers: { Authorization: `Bearer ${tokenFromLocalStorage}` },
      })
      if (res.status === 200) {
        setIsAuthenticated(true)
        setToken(tokenFromLocalStorage)
        setIsLoading(false)
        const { userId } = jwtDecode(tokenFromLocalStorage)
        setUserId(userId)
      } else {
        setIsLoading(false)
        window.localStorage.removeItem('authToken')
      }
    } catch (error) {
      console.log(error)
      setIsLoading(false)
      window.localStorage.removeItem('authToken')
    }
  }

  const fetchWithToken = async (endpoint, method = 'GET', payload) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api${endpoint}`, {
        headers: { Authorization: `Bearer ${token}`, 'Content-type': 'application/json' },
        body: JSON.stringify(payload),
        method,
      })
      return response
    } catch (error) {
      console.error(error)
    }
  }

  const logout = () => {
    setToken()
    window.localStorage.removeItem('authToken')
    setIsAuthenticated(false)
    setUserId()
  }

  useEffect(() => {
    const tokenFromLocalStorage = window.localStorage.getItem('authToken')
    if (tokenFromLocalStorage) {
      // We have a token, we need to verify it
      verifyToken(tokenFromLocalStorage)
    } else {
      // No token, we don't have to do anything
      setIsLoading(false)
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{ saveToken, isAuthenticated, isLoading, fetchWithToken, logout, userId }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
