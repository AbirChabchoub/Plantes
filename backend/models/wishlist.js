const mongoose=require('mongoose');
const wishlistSchema = mongoose.Schema({
    adId: String,
    wishlistUserId: String,
    productName: String,
    category: String,
    description: String,
    price: Number,
    image:String,
   
   
});

const wishlist = mongoose.model('Wishlist', wishlistSchema);
module.exports = wishlist;


