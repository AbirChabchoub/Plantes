const mongoose=require('mongoose');
const orderSchema = mongoose.Schema({
    orderUserId:String,
    productId:String,
    productName: String,
    category: String,
    description: String,
    price: Number,
    image:String,
    vendu:Boolean,

});

const order = mongoose.model('Order', orderSchema);
module.exports = order;