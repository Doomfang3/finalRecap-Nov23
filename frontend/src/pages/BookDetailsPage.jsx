import { Link, useNavigate, useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'

const BookDetailsPage = () => {
  const { bookId } = useParams()
  const [book, setBook] = useState()
  const { fetchWithToken, userId } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/books/${bookId}`)
        if (response.ok) {
          const bookData = await response.json()
          setBook(bookData)
        } else {
          console.log('Something went wrong')
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchBook()
  }, [bookId])

  const handleDelete = async () => {
    try {
      const response = await fetchWithToken(`/books/${bookId}`, 'DELETE')
      if (response.status === 204) {
        navigate('/')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return book ? (
    <>
      <h1>Book Details</h1>
      <p>{book.title}</p>
      <p>{book.author}</p>
      <p>{book.pages}</p>
      {userId === book.createdBy && (
        <>
          <button type='button' onClick={handleDelete}>
            Delete
          </button>
          <Link to={`/books/${book._id}/update`}>Update</Link>
        </>
      )}
    </>
  ) : (
    <h2>Loading...</h2>
  )
}

export default BookDetailsPage
