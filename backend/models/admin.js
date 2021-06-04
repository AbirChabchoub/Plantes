const mongoose=require('mongoose');
const adminSchema = mongoose.Schema({

    fullName: String,
    adminEmail: String,
    adminPassword: String,
    adminConfirmPassword: String,
    image:String
   
    
});

const admin = mongoose.model('Admin', adminSchema);
module.exports = admin;