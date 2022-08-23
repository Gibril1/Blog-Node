const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const port = process.env.PORT || 5000


const app = express()

app.use('/api/goals', require('./routes/blogRoutes'))

app.listen(port, () => console.log(`Server running at port ${port}`))