const jwt = require('jsonwebtoken')

const isAuthenticated = (req, res, next) => {
  try {
    // "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkphbmUgRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.cMErWtEf7DxCXJl8C9q0L7ttkm-Ex54UWHsOCMGbtUc"
    if (req.headers.authorization?.split(' ')[0] === 'Bearer') {
      const token = req.headers.authorization.split(' ')[1]
      const payload = jwt.verify(token, process.env.TOKEN_SECRET)

      req.tokenPayload = payload // { userId }
      next()
    } else {
      throw new Error('No token')
    }
  } catch (error) {
    res.status(401).json('Token is not provided or not valid')
  }
}

module.exports = { isAuthenticated }
