const mongoose = require('mongoose');
const responseSchema = mongoose.Schema({
	responseUserId: String,
	response: String,
	commentId: String,
	firstName: String,
	lastName: String,
	date:String,
	image:String
   
});

const response = mongoose.model('Response', responseSchema);
module.exports = response;
