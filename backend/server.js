const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 500
connectDB()
const app = express()

// IMPORTANT FOR THE BODY OF THE REQUEST
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use('/api/blogs', require('./routes/blogRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server is listening at port ${port}`))