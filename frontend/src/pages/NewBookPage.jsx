import { useContext, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

const NewBookPage = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [pages, setPages] = useState(0)
  const { fetchWithToken } = useContext(AuthContext)

  const navigate = useNavigate()

  const handleSubmit = async event => {
    event.preventDefault()
    const bookToCreate = { title, author, pages }

    try {
      const response = await fetchWithToken('/books', 'POST', bookToCreate)
      if (response.status === 201) {
        const book = await response.json()
        console.log(book)
        navigate(`/books/${book._id}`)
      } else {
        console.log('Something went wrong')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <h1>New book</h1>

      <form
        onSubmit={handleSubmit}
        action='submit'
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <label htmlFor='title'>Title:</label>
        <input
          type='text'
          id='title'
          value={title}
          onChange={event => setTitle(event.target.value)}
        />

        <label htmlFor='author'>Author:</label>
        <input
          type='text'
          id='author'
          value={author}
          onChange={event => setAuthor(event.target.value)}
        />

        <label htmlFor='pages'>Pages:</label>
        <input
          type='text'
          id='pages'
          value={pages}
          onChange={event => setPages(event.target.value)}
        />

        <button type='submit'>SUBMIT</button>
      </form>
    </>
  )
}

export default NewBookPage
