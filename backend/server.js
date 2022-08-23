const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const { errorHandler } = require('./middleware/errorMiddleware')
const port = process.env.PORT || 5000


const app = express()

// body middleware
app.use(express.json())
app.use(express.urlencoded({ extended : false}))

app.use('/api/goals', require('./routes/blogRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server running at port ${port}`))