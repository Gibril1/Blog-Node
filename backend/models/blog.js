const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    author:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title:{
        type: String,
        required: [true, 'Please your name']
    },
    content:{
        type: String,
        required: [true, 'Please your content']
    }
}, {
    timeStamps: true,
})

module.exports = mongoose.model('Blogs', blogSchema)





