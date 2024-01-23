import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useContext(AuthContext)

  return isLoading ? <h1>Loading...</h1> : isAuthenticated ? children : <Navigate to='/login' />
}

export default PrivateRoute
