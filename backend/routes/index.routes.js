const router = require('express').Router()

router.get('/', (req, res) => {
  res.json('All good in here')
})

const booksRouter = require('./books.routes')
router.use('/books', booksRouter)

module.exports = router
