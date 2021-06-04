const mongoose=require('mongoose');
const blogSchema = mongoose.Schema({
    title: String,
    article: String,
    image: String
});

const blog = mongoose.model('Blog', blogSchema);
module.exports = blog;