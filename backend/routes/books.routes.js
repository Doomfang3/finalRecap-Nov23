const { isAuthenticated } = require('../middlewares/route-guard.middleware')
const Book = require('../models/Book.model')
const User = require('../models/User.model')

const router = require('express').Router()

// GET all
router.get('/', async (req, res) => {
  try {
    const allBooks = await Book.find()
    res.status(200).json(allBooks)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'error while getting the books' })
  }
})
// GET one
router.get('/:bookId', async (req, res) => {
  const { bookId } = req.params
  try {
    const oneBook = await Book.findById(bookId)
    res.status(200).json(oneBook)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'error while getting the book' })
  }
})

// POST one
router.post('/', isAuthenticated, async (req, res) => {
  const payload = req.body
  const { userId } = req.tokenPayload
  payload.createdBy = userId
  try {
    const createdBook = await Book.create(payload)
    res.status(201).json(createdBook)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'error while creating the book' })
  }
})
// PUT one
router.put('/:bookId', isAuthenticated, async (req, res) => {
  const { userId } = req.tokenPayload
  const payload = req.body
  const { bookId } = req.params
  try {
    const bookToUpdate = await Book.findById(bookId)
    if (bookToUpdate.createdBy == userId) {
      const updatedBook = await Book.findByIdAndUpdate(bookId, payload, { new: true })
      res.status(200).json(updatedBook)
    } else {
      res.status(403).json({ message: 'you are not the right user' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'error while updating the book' })
  }
})
// DELETE one
router.delete('/:bookId', isAuthenticated, async (req, res) => {
  const { userId } = req.tokenPayload
  const { bookId } = req.params
  try {
    const bookToDelete = await Book.findById(bookId)
    console.log(bookToDelete, userId)
    if (bookToDelete.createdBy == userId) {
      console.log('Deleting')
      await Book.findByIdAndDelete(bookId)
      res.status(204).json()
    } else {
      res.status(403).json({ message: 'you are not the right user' })
    }
  } catch (error) {
    res.status(500).json({ message: 'error while deleting the book' })
  }
})

module.exports = router
