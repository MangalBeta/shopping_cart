var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProductSchema = new Schema({
     name: String,
     imagefile: String,
     description: String, 
     price: Number,
     instock: Number
    });

var Product = mongoose.model('Product', ProductSchema);
      module.exports=Product;

