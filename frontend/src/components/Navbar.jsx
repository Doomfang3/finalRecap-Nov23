import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

const Navbar = () => {
  const { isAuthenticated } = useContext(AuthContext)

  return (
    <nav>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        {isAuthenticated ? (
          <>
            <li>
              <Link to='/books/new'>New book</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to='/signup'>Signup</Link>
            </li>
            <li>
              <Link to='/login'>Login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
