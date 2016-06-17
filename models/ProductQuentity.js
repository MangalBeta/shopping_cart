var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProductSchema=require("./ProductSchema");
//console.log(ProductSchema);
  var ProductQuantitySchema = new Schema({
      quantity: Number,
      product: [{type : Schema.Types.ObjectId, ref : 'ProductSchema'}]
    }, 
    { _id: false });

var ProductQuantity= mongoose.model('ProductQuantity', ProductQuantitySchema);
     module.exports=ProductQuantity;


