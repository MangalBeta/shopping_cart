var mongoose = require('mongoose');
var Usermodel = require('../models/userSchema');
module.exports.getUsers= function(req, res) {
  Usermodel.find({})
  .exec(function(err, users) {
  if (!users){     
   res.json(404, {msg: 'Users Not Found.'});
   } else {
   res.json(users);
    }
     });
     };

module.exports.getProfile = function(req, res) {
  console.log(req.params.id);
 Usermodel.findOne({ _id: req.params.id })
 .exec(function(err, user) {
  if (!user){
  res.json(404, {msg: 'Photo Not Found.'});
  } else {
  	res.send(user);
    }
     });
     };

 module.exports.removeUsers=function(req,res){
  console.log(req.params.id);
  Usermodel.findById(req.params.id, function ( err, user){
    user.remove(function (err, user ){
      //res.redirect( '/list' );
      res.send(user)
      console.log("delete user");
    });
  });
}


module.exports.editUsers=function (req, res ){
  Usermodel.findById(req.params.id, function ( err, user){
    if(err){
        res.json(err);
      }else{
        res.send(user);
//req.session.user=person;
     // res.redirect( '/');
  }
    });
  }

module.exports.saveEditUsers=function (req, res ){
  console.log(req.body);
  Usermodel.findById(req.params.id, function ( err, user ){
    user.local.name =req.body.name;
 
    //blog.images  = req.file.filename;
    user.save( function ( err, user ){
      if(err){
        res.json(err);
      }else{
    // req.session.user=person;
      //res.redirect( '/list');
      res.send(user)
  }
    });
  });
}