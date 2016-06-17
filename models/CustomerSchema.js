var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AddressSchema=require("./AddressSchema");
var userSchema=require("./userSchema");
var ProductQuentity=require("./ProductQuentity");
var BillingSchema=require("./BillingSchema");
var CustomerSchema = new Schema({
     	username: {type:String,unique:true},   
     	shipping: [],
     	billing: [],
     	cart: []
     	});

 var Customer=mongoose.model('Customer', CustomerSchema);
       module.exports=Customer;

