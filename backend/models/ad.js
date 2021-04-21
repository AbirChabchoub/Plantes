const mongoose=require('mongoose');
const adSchema = mongoose.Schema({

    productName: String,
    category: String,
    description: String,
    price: Number,
    image:String,
    userId:String
    
});

const ad = mongoose.model('Ad', adSchema);
module.exports = ad;