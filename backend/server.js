const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const port = process.env.PORT || 5000


const app = express()

app.get('/api/goals', (req, res) => {
    res.send('Get goals')
})
app.post('/api/goals', (req, res) => {
    res.send('Set goals')
})
app.put('/api/goals', (req, res) => {
    res.send('Update goals')
})
app.delete('/api/goals', (req, res) => {
    res.send('Delete goals')
})

app.listen(port, () => console.log(`Server running at port ${port}`))