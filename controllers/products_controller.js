var mongoose = require('mongoose');
var Product = require("../models/ProductSchema");

module.exports.addProduct=function(req,res,next){
var newProduct=new Product();
newProduct.name=req.body.title;
newProduct.imagefile=req.file.filename;
newProduct.description= req.body.description;
newProduct.price= req.body.price;
newProduct.instock= Math.floor((Math.random()*10)+1);

newProduct.save(function(err,product){
  if(err){
    console.log('err',err)
  }else{
    console.log(product);
    res.send(product);
    //res.redirect("/list")
  }

})
};
module.exports.getProduct = function(req, res) {
  console.log(req.params.id);
 Product.findOne({ _id: req.params.id })
 .exec(function(err, product) {
  if (!product){
  res.json(404, {msg: 'Photo Not Found.'});
  } else {
  	res.send(product);
    }
     });
     };

module.exports.getProducts = function(req, res) {
  Product.find({})
  .exec(function(err, products) {
  if (!products){     
   res.json(404, {msg: 'Products Not Found.'});
   } else {
   res.json(products);
    }
     });
     };

  module.exports.removeProduct=function(req,res){
  console.log(req.params.id);
  Product.findById(req.params.id, function ( err, product ){
    product.remove(function (err, product ){
      //res.redirect( '/list' );
      res.send(product)
      console.log("delete preduct");
    });
  });
}


module.exports.editProduct=function (req, res ){
  Product.findById(req.params.id, function ( err, product ){
    if(err){
        res.json(err);
      }else{
        res.send(product);
//req.session.user=person;
     // res.redirect( '/');
  }
    });
  }

module.exports.saveEditProduct=function (req, res ){
  console.log(req.body);
  Product.findById(req.params.id, function ( err, product ){
    product.name =req.body.name;
    product.description  = req.body.description;
    product.price  = req.body.price;
    //blog.images  = req.file.filename;
    product.save( function ( err, product ){
      if(err){
        res.json(err);
      }else{
    // req.session.user=person;
      //res.redirect( '/list');
      res.send(product)
  }
    });
  });
}