var express = require('express');
var router=express.Router();
var multer  = require('multer');
var mime = require('mime-types')
//Add Image Stoarge
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
    	console.log('file ',file);
        cb(null, Date.now()+'.'+mime.extension(file.mimetype));
    }
});
var uploadProduct= multer({ storage: storage });

var customers = require('../controllers/customers_controller');
var products = require('../controllers/products_controller');
var orders = require('../controllers/orders_controller');
var users = require('../controllers/userController');
var blogController=require('../controllers/blogController');
  //app.use('/static', express.static( './static')).  use('/images', express.static( '../images')).use('/lib', express.static( '../lib') );
//****passsport authentications*******
var passport = require('passport');
var path =require("path");
var crypto=require('crypto');
var bcrypt = require('bcrypt-nodejs');
var LocalStrategy = require('passport-local').Strategy;
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport('smtps://mangalhcl449@gmail.com:meanstack@smtp.gmail.com');
//var upload = multer({ dest: 'uploads/' });
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/usersuploads/')
    },
    filename: function (req, file, cb) {
    	console.log('file ',file);
        cb(null, Date.now()+'.'+mime.extension(file.mimetype));
    }
});
var upload = multer({ storage: storage });
//var upload = multer({ dest: 'uploads/' });

//***uploda post images
var Blogstorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/blogUpload/')
    },
    filename: function (req, file, cb) {
      console.log('file ',file);
        cb(null, Date.now()+'.'+mime.extension(file.mimetype));
    }
});
var blogUpload = multer({ storage: Blogstorage });
//passport
var passport = require('passport');
var Usermodel = require('../models/userSchema');
var adminSchema = require('../models/adminSchema');
//admin match login
  //console.log(adminmodel)

//***********make the password is encrypted form and validate the loginuser
var isValidPassword = function(user, password){
  return bcrypt.compareSync(password, user.local.password);
}

var createHash = function(password){
 return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

//**************passport signup*************************
passport.use('local-signup', new LocalStrategy({
    passReqToCallback : true
  },
function(req, username, password, done) {
   findOrCreateUser = function(){
   var seed = crypto.randomBytes(20);
   var authToken = crypto.createHash('sha1').update(seed + req.body.email).digest('hex');
      // find a user in Mongo with provided username
   Usermodel.findOne({'local.username':username},function(err, user) {
          var newUser = new Usermodel();
          newUser.local.username = username;
          newUser.local.password = createHash(password);
          newUser.local.email = req.body.email;
          newUser.local.name = req.body.name;
          newUser.local.gender = req.body.gender;
          newUser.local.pic = req.file.filename;
          newUser.local.authToken = authToken;
          newUser.local.isAuthenticated=false;
   var authenticationURL = 'http://localhost:3002/api/verify_email?token=' + newUser.local.authToken;
   console.log(authenticationURL)
          // save the user
          newUser.save(function(err) {
            if (err){
              console.log('Error in Saving user: '+err);  
              throw err;  
            }
            else
            {         
    var mailOptions = {
    from: 'Mangal ', // sender address
    to: 'c.vicky1231990@gmail.com', // list of receivers
    subject: 'Hello ✔', // Subject line
   // text: 'tera meara<br><a href="http://localhost:3002/users/verify-email/' +newUser.local.confirmation+'">', // plaintext body
    html: 'Please confirm your registration here  html: <a  target=_blank href= ' + authenticationURL + '>Confirm your email</a>' // html body
       };
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message Sent:' + info.response);
   });
    return done(null, newUser);
          }
          });
        });
    };
    // Delay the execution of findOrCreateUser and execute 
    // the method in the next tick of the event loop
   process.nextTick(findOrCreateUser);
  }));
///***********************************
var upload = multer({ storage: storage });

/* GET home page. */

router.get('/loggedin', function(req, res) {
  res.send(req.isAuthenticated() ? req.user : '0');
});

//*******************passsport Authentication****************************//

passport.use('local-login',new LocalStrategy(function(username, password, done) {
      var authenticated=true;
    Usermodel.findOne({'local.username': username,'local.isAuthenticated': authenticated}, function(err,user){
         if(err){
            return done(err);
            }else{
         
         if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }
         
        if(!isValidPassword(user,password)){
           console.log("incorrect password");
           return done(null, false, { message: 'Incorrect password.' });
       }
     }
   return done(null, user);
    })
    
  }));

//passport serialize user for their session
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
//passport deserialize user 
passport.deserializeUser(function(id, done) {
  Usermodel.findById(id, function(err, user) {
    done(err, user);
  });
});

//********************************************
router.post('/login', passport.authenticate('local-login'), function(req, res) {
  res.send(req.user);
});
//router.post('/login',userController.login);
// router.post('/login', passport.authenticate('local', {successRedirect:'/', failureRedirect:'/login'}),function(req, res) {
//     res.redirect('/');
//   });
//*******Varify email route
//******************
router.get('/verify_email', function(req,res) {
  console.log('verify-email token: ',req.query.token);
Usermodel.findOne({'local.authToken': req.query.token }, function(err,user) {
  if (err) { return console.error(err); }
     console.log(user);
     user.local.isAuthenticated=true;
     console.log(user.local.isAuthenticated);
          //var newuser = new Usermodel();
          // user.isAuthenticated = true;
  user.save(function (err) {
            if (err) return console.error(err);
            console.log('succesfully updated user');
            console.log(user);
            // sendgrid.send({
            //     to:       user.local.email,
            //     from:     'mangalhcl449@gmail.com',
            //     subject:  'Email confirmed!',
            //     html:     'Awesome! We can now send you kick-ass emails'
            //     }, function(err, json) {
            //         if (err) { return console.error(err); }
            //     console.log(json);
            // });
            res.redirect('/login');
            //update page
        });
    });
   // res.sendFile('/public/javascripts/view/login.html');
});

///***************logout *********

router.get('/logout', function(req, res){
    req.logout();
    res.send(req.user)
    console.log("user is logout")
    // res.redirect('/login');
});

//router.post('/signup',upload.single('file'),userController.signup);
router.post('/signup',upload.single('file'), passport.authenticate('local-signup'), function(req, res) {
  console.log(req.user);
  res.send(req.user);
});

//**********adminpage login credential**************
passport.use('admin-login',new LocalStrategy(function(username, password, done) {
    adminSchema.findOne({username: username}, function(err,user){
         if(err){
            return done(err);
            }else{
           if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        } 
        if(user.password != password){
           console.log("incorrect password");
           return done(null, false, { message: 'Incorrect password.' });
       }
     }
   return done(null, user);
    })
    
  }));
//Admin ckeck login
router.post('/admin', passport.authenticate('admin-login'), function(req, res) {
  res.send(req.user);
});
router.post('/adminlogout', function(req, res){
    req.logout();
    res.send(req.user)
    console.log("admin is logout")
    res.redirect('/dashboard');
});
// router.post('/admin',function(req,res){
//    var username=req.body.username;
//   var password=req.body.password;
  
// adminSchema.findOne({username:req.body.username},function(err,user){
//   if(err){
//     res.send(err)
//   }else{
//  if(user.password == password){
//   console.log(user)
//   res.send(user)
//  }else{
//   res.send(err)
//  }
//   //  // console.log(user.password)
//     //   if(user.password == password){
//     //      res.send(user);
//     //    }else{
//     //     res.send(err)
//     //    }
//    //  newAdmin.save(function(err,user){
//    //    if(err){
//    //      console.log("err");
//    //    }
//    // else{
//    //  console.log(user)
//    //    res.send(user);
//    // }
//    //  });
//     // }else{
//     // res.send(err)
//     // }
//   }
// })
// })
    
//****** make the route 
// router.get('/redirectUrl', function(req,res){
//   res.status();
// })
router.get('/payment/paypal/execute',function(req,res){
console.log("payment is done")
})
router.post('/reply/comment',blogController.replyaddComment);
router.get('/reply/comment/:id',blogController.viewreplyComments);
router.post('/addBlog',blogUpload.single('file'),blogController.addBlog);
router.post('/comment/blog',blogController.addComment);
router.get('/comment/blog/:id',blogController.viewComments);
router.put('/likes/comment/:id' ,blogController.likesComment);
router.put('/dislikes/comment/:id' ,blogController.dislikesComment);
router.get('/viewALLBlog' ,blogController.viewALLBlog);
router.delete('/delete/post/:id', blogController.removeData);
router.delete('/delete/comment/:id', blogController.removeComment);
router.get('/reply/comment/:id', blogController.replyComment);
router.get('/edit/comment/:id', blogController.editComment);
router.put('/edit/comment/:id', blogController.saveEditComment); 
router.get('/edit/post/:id', blogController.editBlog);
router.put('/edit/post/:id', blogController.saveEditBlog); 
router.get('/users/get', users.getUsers);
router.get('/users/profile/get/:id', users.getProfile);
router.delete('/users/delete/:id', users.removeUsers);
router.get('/users/editUser/:id', users.editUsers);
router.put('/users/editUser/:id', users.saveEditUsers); 
router.post('/addproduct',uploadProduct.single('file'), products.addProduct);
router.post('/v1/payments/payment',customers.paynow);
//router.get('/success',customers.paynow);
router.get('/products/get', products.getProducts);
router.delete('/products/delete/:id', products.removeProduct);
router.get('/products/editProduct/:id', products.editProduct);
router.put('/products/editProduct/:id', products.saveEditProduct);  
router.get('/singlProduct/:id', products.getProduct);
router.get('/orders/get',orders.getOrders); 
router.get('/orders/get/quantity',orders.getddd); //orders.getOrders,
router.get('/singleUserOrder/get/:myUser',orders.getOrder);
router.post('/orders/add/:myUser', orders.addOrder,orders.clearCart);
router.post('/customers/add', customers.addCustomer)
router.get('/customers/get/:myUser', customers.getCustomer);
router.post('/customers/update/shipping/:myUser', customers.updateShipping);
router.post('/customers/update/billing/:myUser', customers.updateBilling);
router.post('/customers/update/cart/:myUser', customers.updateCart);
//router.delete('/customers/delete/cart/:myUser', customers.deleteCart);

module.exports = router;
