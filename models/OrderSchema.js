var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var AddressSchema=require("./AddressSchema");
var ProductQuentity=require("./ProductQuentity");
var BillingSchema=require("./BillingSchema");
var OrderSchema = new Schema({
	 userid: String,
	 items: [],
	 shipping: [],
	 billing: [],
	 status: {type: String, default: "Pending"},
	 timestamp: { type: Date, default: Date.now 
	   }
	    });

var Order=mongoose.model('Order', OrderSchema);
  module.exports=Order;




