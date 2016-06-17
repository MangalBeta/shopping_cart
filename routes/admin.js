// var express = require('express');
// var router=express.Router();
// var multer  = require('multer');
// var mime = require('mime-types')
// var adminSchema = require('../models/adminSchema');
// var products = require('../controllers/products_controller');
// //Add Image Stoarge
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './public/uploads/')
//     },
//     filename: function (req, file, cb) {
//       console.log('file ',file);
//         cb(null, Date.now()+'.'+mime.extension(file.mimetype));
//     }
// });
// var uploadProduct= multer({ storage: storage });
// //Add Image Stoarge

// //admin match login
//   //console.log(adminmodel)

// //**********adminpage login credential
// router.post('/dashboard',function(req,res){
//    var username=req.body.username;
//   var password=req.body.password;
// //   var newAdmin=new adminSchema();
// // newAdmin.username=req.body.username;
// // newAdmin.password=req.body.password;
// //console.log(newAdmin);
// adminSchema.findOne({username:username},function(err,user){
//   if(err){
//     res.send(err)
//   }else{
//     if(user){
//       if(user.password == password){
//          res.send(user);
//        }else{
//         res.send(err)
//        }
//    //  newAdmin.save(function(err,user){
//    //    if(err){
//    //      console.log("err");
//    //    }
//    // else{
//    //  console.log(user)
//    //    res.send(user);
//    // }
//    //  });
//     }else{
//       console.log("user already exit")
//     }
//   }
// })
    
//     })
 
// //****** make the route 

// router.post('/addproduct',uploadProduct.single('file'), products.addProduct);

// //router.delete('/customers/delete/cart/:myUser', customers.deleteCart);

// module.exports = router;
