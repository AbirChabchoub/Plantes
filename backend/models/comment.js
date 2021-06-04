const mongoose = require('mongoose');
const commentSchema = mongoose.Schema({
	commentUserId: String,
	message: String,
	adId: String,
	firstName: String,
	lastName: String,
	date:String,
	image:String
   
});

const comment = mongoose.model('Comment', commentSchema);
module.exports = comment;
