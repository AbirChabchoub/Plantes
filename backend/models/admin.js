const mongoose=require('mongoose');
const adminSchema = mongoose.Schema({

    fullName: String,
    adminEmail: String,
    adminPassword: String,
    adminConfirmPassword: String
   
    
});

const admin = mongoose.model('Admin', adminSchema);
module.exports = admin;