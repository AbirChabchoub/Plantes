const mongoose = require('mongoose');
const questionSchema = mongoose.Schema({
	questionUserId: String,
	question: String,
	adId: String,
	firstName: String,
	lastName: String,
	date:String,
	image:String
   
});

const question = mongoose.model('Question', questionSchema);
module.exports = question;
