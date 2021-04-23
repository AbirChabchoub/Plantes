const mongoose=require('mongoose');
const commentSchema = mongoose.Schema({
    fullName:String,
    commentUserId:String,
    message:String

});

const comment = mongoose.model('Comment', commentSchema);
module.exports = comment;