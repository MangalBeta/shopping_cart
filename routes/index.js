var express = require('express');
var router=express.Router();
// var multer  = require('multer');
// var mime = require('mime-types')
// //Add Image Stoarge
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './public/uploads/')
//     },
//     filename: function (req, file, cb) {
//     	console.log('file ',file);
//         cb(null, Date.now()+'.'+mime.extension(file.mimetype));
//     }
// });
// var upload = multer({ storage: storage });

// var customers = require('../controllers/customers_controller');
// var products = require('../controllers/products_controller');
// var orders = require('../controllers/orders_controller');
//   //app.use('/static', express.static( './static')).  use('/images', express.static( '../images')).use('/lib', express.static( '../lib') );


router.get('/*', function(req, res){
    	res.render('index');
  
  });
// //****** make the route 
// router.get('/paynow',customers.paynow);
// router.post('/addproduct',upload.single('file'), products.addProduct);
// router.get('/products/get', products.getProducts);
// router.get('/singlProduct/:id', products.getProduct);
// router.get('/orders/get', orders.getOrders);
// router.get('/singleUserOrder/:id',orders.getOrder);
// router.post('/orders/add/:myUser', orders.addOrder);
// router.post('/add', customers.addCustomer)
// router.get('/customers/get/:myUser', customers.getCustomer);
// router.post('/customers/update/shipping/:myUser', customers.updateShipping);
// router.post('/customers/update/billing/:myUser', customers.updateBilling);
// router.post('/customers/update/cart/:myUser', customers.updateCart);
// //router.delete('/customers/delete/cart/:myUser', customers.deleteCart);

module.exports = router;
