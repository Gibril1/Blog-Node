const getBlogs = (req, res) => {
    res.send({message: 'Get blogs'})
}
const setBlogs = (req, res) => {
    res.send({message: 'Set blogs'})
}
const updateBlogs = (req, res) => {
    res.send({message: `Update Blog ${req.params.id}`})
}
const deleteBlogs = (req, res) => {
    res.send({message: `Delete Blog ${req.params.id}`})
}

module.exports = {
    getBlogs,
    setBlogs,
    updateBlogs,
    deleteBlogs
}