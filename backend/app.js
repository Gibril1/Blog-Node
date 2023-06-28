const express = require('express')
const app = express()

// body middleware
app.use(express.json())
app.use(express.urlencoded({ extended : false}))

app.use('/api/v1/blogs', require('./routes/blogRoutes'))
app.use('/api/v1/users', require('./routes/userRoutes'))


module.exports = app