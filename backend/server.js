require('dotenv').config()
require('colors')
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000

connectDB()

const app = require('./app')

app.use(errorHandler)

app.listen(port, () => console.log(`Server running at port ${port}`.blue.underline))
