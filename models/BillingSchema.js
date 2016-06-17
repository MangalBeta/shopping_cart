  var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var AddressSchema=require("./AddressSchema");
  var BillingSchema = new Schema({
   	 cardtype: { type: String, enum: ['Visa', 'MasterCard', 'Amex'] },
   	 name: String,
     amount:String,
     cvv:Number,
   	 number: String,
   	 expiremonth: Number,
   	 expireyear: Number,
   	 address: []

   	 }, 
   	  { _id: false }); 

 var Billing = mongoose.model('Billing', BillingSchema);
     module.exports=Billing;



 