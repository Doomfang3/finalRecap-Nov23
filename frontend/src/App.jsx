import { Route, Routes } from 'react-router-dom'
import BooksPage from './pages/BooksPage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import Navbar from './components/Navbar'
import PrivateRoute from './components/PrivateRoute'
import NewBookPage from './pages/NewBookPage'
import BookDetailsPage from './pages/BookDetailsPage'
import UpdateBookPage from './pages/UpdateBookPage'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<BooksPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route
          path='/books/new'
          element={
            <PrivateRoute>
              <NewBookPage />
            </PrivateRoute>
          }
        />
        <Route path='/books/:bookId' element={<BookDetailsPage />} />
        <Route
          path='/books/:bookId/update'
          element={
            <PrivateRoute>
              <UpdateBookPage />
            </PrivateRoute>
          }
        />

        <Route path='*' element={<h1>404 Page not found</h1>} />
      </Routes>
    </>
  )
}

export default App
