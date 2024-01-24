import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

const UpdateBookPage = () => {
  const { bookId } = useParams()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [pages, setPages] = useState(0)

  const { fetchWithToken } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchOneBook = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/books/${bookId}`)

        if (response.ok) {
          const bookData = await response.json()
          setTitle(bookData.title)
          setAuthor(bookData.author)
          setPages(bookData.pages)
        }
      } catch (error) {
        console.log('Something went wrong ', error)
      }
    }

    fetchOneBook()
  }, [bookId])

  const handleSubmit = async event => {
    event.preventDefault()

    try {
      const response = await fetchWithToken(`/books/${bookId}`, 'PUT', { title, author, pages })
      if (response.status === 200) {
        navigate(`/books/${bookId}`)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <h1>Update Book </h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input value={title} onChange={event => setTitle(event.target.value)} />
        </label>
        <label>
          Author:
          <input value={author} onChange={event => setAuthor(event.target.value)} />
        </label>
        <label>
          Pages:
          <input value={pages} type='number' onChange={event => setPages(event.target.value)} />
        </label>
        <button type='submit'>Update</button>
      </form>
    </>
  )
}

export default UpdateBookPage
