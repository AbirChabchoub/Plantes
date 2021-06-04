const mongoose=require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const adSchema = mongoose.Schema({

    productName: {type:String,required:true},
    category: {type:String,required:true},
    description: {type:String,required:true},
    price: {type:Number,require:true},
    image:{type:String,required:true},
    userId:{type:String},
    vendu:{type:Boolean}
    
});
adSchema.plugin(uniqueValidator);
const ad = mongoose.model('Ad', adSchema);
module.exports = ad;




// const mongoose = require('mongoose');
// import mongoose-unique-Validator module
// 
// const userSchema = mongoose.Schema({
// 	firstName: { type: String, required: true },
// 	lastName: { type: String, required: true },
// 	email: { type: String, required: true, unique: true },
// 	pwd: { type: String, required: true },
// 	confirmPwd: { type: String },
// 	role: { type: String, required: true }
// });
// userSchema.plugin(uniqueValidator);
// const user = mongoose.model('User', userSchema);
