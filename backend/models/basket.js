const mongoose=require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const basketSchema = mongoose.Schema({

    productName: {type:String,required:true},
    category: {type:String,required:true},
    price: {type:Number,require:true},
    image:{type:String,required:true},
    basketUserId:{type:String},
    vendu:{type:Boolean}
    
});
basketSchema.plugin(uniqueValidator);
const basket = mongoose.model('Basket', basketSchema);
module.exports = basket;





