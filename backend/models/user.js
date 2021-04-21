const mongoose=require('mongoose');
const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    tel: String,
    address:String,
    pwd:String,
    confirmPwd:String,
    role:String
});

const user = mongoose.model('User', userSchema);
module.exports = user;