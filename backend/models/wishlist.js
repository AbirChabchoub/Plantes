const mongoose=require('mongoose');
const wishlistSchema = mongoose.Schema({
    adId: String,
    wishlistUserId: String
   
});

const wishlist = mongoose.model('Wishlist', wishlistSchema);
module.exports = wishlist;


