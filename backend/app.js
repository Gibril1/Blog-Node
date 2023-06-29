const express = require('express')
const app = express()

// body middleware
app.use(express.json())
app.use(express.urlencoded({ extended : false}))

app.get('/', (req, res) => {
    res.json({
        'msg': 'Slightly Techie to the world'
    })
})
app.use('/api/v1/blogs', require('./routes/blogRoutes'))
app.use('/api/v1/users', require('./routes/userRoutes'))


module.exports = app