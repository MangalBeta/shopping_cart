var mongoose = require('mongoose');
var config = require("./confige");
 var  Customer = require("../models/CustomerSchema");
 var Address =require("../models/AddressSchema");
 var Billing =require("../models/BillingSchema");
 var paypal= require('paypal-rest-sdk');
//console.log(Address)

module.exports.addCustomer = function(req, res) {
var newCustomer=new Customer();
//console.log(newCustomer);
newCustomer.username=req.body.username;
//newCustomer.shipping=Address;
//newCustomer.billing= Billing;
newCustomer.cart= [];
  Customer.findOne({username:req.body.username},function(err,customer){
  if(err){
    console.log("err")
  }else{
    if(!customer){
newCustomer.save(function(err,customer){
  if(err){
    console.log('err',err)
  }else{
    res.send(customer);
    //res.send(customer);
  }
  //res.send(customer);
   })
    }
    else if(customer){
      res.send(customer)
    }
  }
})

};


module.exports.getCustomer = function(req, res) {
  console.log("mu user" + req.params.myUser)
  Customer.findOne({username: req.params.myUser })
  .exec(function(err, customer) {
  if (!customer){
  res.json(404, {msg: 'Customer Not Found.'});
  } else {
  res.send(customer);
   }
    });
    };


module.exports.updateShipping = function(req, res){
var newShipping = new Address(req.body.updatedShipping);
 console.log(newShipping)
 Customer.findOneAndUpdate({username: req.params.myUser },
     {$set:{shipping:[newShipping.toObject()]}})
    .exec(function(err, results){
    if (err || results < 1){
         res.json(404, {msg: 'Failed to update Shipping.'});
     } else {
      console.log(results)
      res.send(results);
       }
       });
        };


  module.exports.updateBilling = function(req, res){
     // This is where you could verify the credit card information
      // and halt the checkout if it is invalid.
var newBilling = new Billing({
name:req.body.name,
cardtype:req.body.cardtype,
amount:req.body.amount,
expiremonth:req.body.expiremonth,
expireyear:req.body.expireyear,
cvv:req.body.cvv,
address:req.body.address
    });

Customer.findOneAndUpdate({username: req.params.myUser },
 {$set:{billing:[newBilling.toObject()]}})
         .exec(function(err, results){
         if (err || results < 1){
              res.json(404, {msg: 'Failed to update Billing.'});
                   } else {
            console.log(results)
            res.send(results);
                       }
                         });
                         };


exports.updateCart = function(req, res){
//console.log(req.body.updatedCart);
Customer.findOne({username: req.params.myUser},function(err,customer){
   if (err || customer < 1){
       res.send(err);
       } else {
    customer.cart=req.body.updatedCart;
     customer.save(function(err,customer){
      if(err){
        res.send(err);
      }else{
        console.log(Customer)
        res.send(customer);
      }
  
        })
      }
        
 })
}

var config = {
  "port" : 3002,
  "api" : {
  "host" : "api.sandbox.paypal.com",          
  "client_id" : "AQbcEm-wBul0oksUiYbjuRJRGes2RbE9GROHrtzi9kr6VnA2DV7i3iO70mwh5R25vRdsZbytBwizHo6R",  // your paypal application client id
  "client_secret" : "EONI9-G6VCmG-7C8o2E0QgWdaHbzmlOPJg59qxEs2tiSSIYCU-rdZYEzRla0BlDspGBoFRwzuWDql-Kt" // your paypal application secret id

  }
}
///console.log(config);
paypal.configure(config.api);

module.exports.paynow=function(req,res) {

  // "transactions": [{
  //   "amount": {
  //     "total":parseInt(req.body.amount),
  //     "currency":  req.body.currency
  //   },
  //   "description": req.body.description,
  //   "item_list": { 
  //               "items":[
  //                   {
                       
  //                       "name":"Hat"
  //                   }
  //               ]
  //           }
  // }]
  var create_payment_json = {
   "intent": "sale",
  "payer": {
    "payment_method": "paypal"
  },
  "redirect_urls": {
    "return_url":"http://localhost:3000/payment/paypal/execute",
    "cancel_url":"http://localhost:3000/products"
  },
    "transactions": [
    {
      "amount": {
        "total": "30.11",
        "currency": "USD",
        "details": {
          "subtotal": "30.00",
          "tax": "0.07",
          "shipping": "0.03",
          "handling_fee": "1.00",
          "insurance": "0.01",
          "shipping_discount": "-1.00"
        }
      },
 "description": "This is the payment transaction description",
       "item_list": {
        "items": [
          {
            "name": "hat",
            "sku": "1",
            "price": "3.00",
            "currency": "USD",
            "quantity": "5",
            "description": "Brown color hat",
            "tax": "0.01"
          },
          {
            "name": "handbag",
            "sku": "product34",
            "price": "15.00",
            "currency": "USD",
            "quantity": "1",
            "description": "Black color handbag",
            "tax": "0.02"
          }
        ],
        "shipping_address": {
          "recipient_name": "HelloWorld",
          "line1": "4thFloor",
          "line2": "unit#34",
          "city": "SAn Jose",
          "state": "CA",
          "phone": "011862212345678",
          "postal_code": "95131",
          "country_code": "US"
        }
      }
    }]

};
paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
        console.log(error.response);
        throw error;
    } else {
       console.log(payment)
        for (var index = 0; index < payment.links.length; index++) {
        //Redirect user to this endpoint for redirect url
            if (payment.links[index].rel === 'approval_url') {
                  redirectUrl = payment.links[index].href;     
            }
        }
      // console.log(redirectUrl);
        res.send(redirectUrl);
       
    }
});
}

//88config api 

// //console.log(paypal.configure(config.api));
// //** paynow with paypal
// module.exports.paynow= function(req, res) {
//     // paypal payment configuration.
//  var payment = {
//   "intent": "sale",
//   "payer": {
//     "payment_method": "paypal"
//   },
//   "redirect_urls": {
//     "return_url":"/success",
//     "cancel_url":"/cancel"
//   },
//   "transactions": [{
//     "amount": {
//       "total":parseInt(req.body.amount),
//       "currency":  req.body.currency
//     },
//     "description": req.body.description
//   }]
// };
// //  paypal.generate_token(function(error, token){
// //   if(error){
// //     console.error(error);
// //   } else {
// //     console.log(token);
// //   }
// // });


// //  var newBilling = new Billing(req.body.updatedBilling);
// // // //newBilling);
// // // //console.log(newBilling);

// // //    // paypal payment configuration.
// // //  var card_data = {
// // //   "type": newBilling.cardtype,
// // //   "number": newBilling.number,
// // //   "expire_month": newBilling.expiremonth,
// // //   "expire_year": newBilling.expireyear,
// // //   "cvv": newBilling.cvv,
// // //   "address": newBilling.address
// // //   // "last_name": "Shopper"
// // // };
// // // console.log(card_data);
// paypal.creditCard.create(newBilling, function(error, credit_card){
//   if (error) {
//     console.log(error);
//     throw error;
//   } else {
//     console.log("Create Credit-Card Response");
//     console.log(credit_card);
//     res.send(credit_card);
//   }
// })
// };  
// Customer.findOneAndUpdate({username: req.params.myUser},function(err,customer){
// if(err){
//   res.send(err);
// }else{
//   customer.update({$set:{cart:req.body.updatedCart}})
//       .exec(function(err, results){
//        if(err || results < 1){
//        res.json(404, {msg: 'Failed to update Cart.'});
//        } else {
//         console.log("customer is updated")
//         res.send(customer);
//         }
// })
// }

// });
//}//
    