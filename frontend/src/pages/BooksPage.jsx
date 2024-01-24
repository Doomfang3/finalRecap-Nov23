import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function BooksPage() {
  const [books, setBooks] = useState([])

  const fetchBooks = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/books`)
      if (response.ok) {
        const bookData = await response.json()
        console.log(bookData)
        setBooks(bookData)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  return (
    <div>
      <h1>Books page</h1>
      <ul>
        {books.map(book => (
          <li key={book._id}>
            <Link to={`/books/${book._id}`}>
              <p>{book.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BooksPage
