var mongoose = require('mongoose'),
   Customer = require("../models/CustomerSchema"),
  Order = require("../models/OrderSchema"),
  Address =require("../models/AddressSchema"),
  Billing =require("../models/BillingSchema")

module.exports.getOrder = function(req, res) {
  console.log(req.params.myUser);
   Order.findOne({userid: req.params.myUser })
   .exec(function(err, order) {
     if (!order){
         res.json(404, {msg: 'Order Not Found.'});
         } else {
         res.send(order);
         }
         });
         };
 module.exports.getOrders = function(req, res) {
      Order.find({},function(err, orders) {
      if (!orders){
      res.json(404, {msg: 'Orders Not Found.'});
       } else {
        res.send(orders);
        }
         });
         };

module.exports.getddd=function(req,res){
   Order.aggregate([

        { $unwind: "$items" },
        { $group: {
            _id: "$_id",
            quantity: { $sum: "$items.quantity"  }
        }}
    ], function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(result)
        res.send(result);
    });

 

   }
// module.exports.addOrder = function(req, res){
//   //console.log(req.body);
//    var orderShipping = new Address(req.body.orderShipping);
//    var orderBilling = new Billing(req.body.orderBilling);
//   var orderItems = req.body.orderItems;
// //console.log("order shipping"  + orderShipping)
// var newOrder = new Order()
//       newOrder.userid= req.params.myUser,
//       newOrder.items=orderItems,
//       newOrder.shipping= orderShipping,
//       newOrder.billing= orderBilling
// newOrder.save(function(err, orders){
//    if(err){
// res.send("Failed to save Order.");
//    } else {
//  Customer.findOneAndUpdate({$set:{cart:[]}},function(err,customer){
// if(err){
//   res.send(err)
// }else{
//   console.log("customer" + customer)
// }
// })
//   res.send(orders) 
//   }
             
// })
// //var Customer=new Customer()

// }
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport('smtps://mangalhcl449@gmail.com:meanstack@smtp.gmail.com');
module.exports.addOrder = function(req, res,next){
 var orderShipping = new Address(req.body.orderShipping);
 var orderBilling = new Billing(req.body.orderBilling);
  var orderItems = req.body.orderItems;
//console.log("order shipping"  + orderShipping)
var newOrder = new Order()
      newOrder.userid= req.params.myUser,
      newOrder.items=orderItems,
      newOrder.shipping= orderShipping,
      newOrder.billing= orderBilling
newOrder.save(function(err, results){
        if(err){
             res.json(500, "Failed to save Order.");
            } else {
  //*****send order to user email
  var mailOptions = {
    from: 'mangalhcl449@gmail.com ', // sender address
    to: 'c.vicky1231990@gmail.com', // list of receivers
    subject: 'Billing Info', // Subject line
   // text: 'tera meara<br><a href="http://localhost:3002/users/verify-email/' +newUser.local.confirmation+'">', // plaintext body
    html: 'Your order is save plz check your email' +  newOrder.billing   // html body
       };
       console.log(mailOptions)
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message Sent:' + info.response);
   });

          console.log("order save")
              res.send(results)
               next();
                             }
                                });
 
                              }

module.exports.clearCart=function(req, res){
  
  Customer.findOneAndUpdate({username:req.params.myUser},{$set:{cart:[]}})
                .exec(function(err, results){
                    if (err || results < 1){
            console.log('Failed to update Cart.');
                    } else {
                      console.log(results)
              console.log("updated cart");
                }
                         });

}