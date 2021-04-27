const mongoose=require('mongoose');
const orderSchema = mongoose.Schema({
    orderUserId:String,
    productId:String,

});

const order = mongoose.model('Order', orderSchema);
module.exports = order;