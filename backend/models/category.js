const mongoose=require('mongoose');
const categorySchema = mongoose.Schema({
   categoryName:String
});

const category = mongoose.model('Category', categorySchema);
module.exports = category;