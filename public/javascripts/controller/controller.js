/*
****************** In this controller *************
1. sign up and login the user with the proper validation by passport
2.add customer 
3.view the all product;
4.add to  cart 
5.set the shipping and billing 
6.view the all post 
7.add the comment box in single post 
8.set the comment box functionalty
*/
app.controller('shoppingController',['$scope', '$http', '$window','$location','$localStorage','createUser','Auth','$q','$rootScope','$interval','$route','notificationMessage','myPageCtx','$sessionStorage','blogServices','$routeParams','comment',
  
function($scope, $http, $window,$location,$localStorage,createUser,Auth,$q,$rootScope,$interval,$route,notificationMessage,myPageCtx,$sessionStorage,blogServices,$routeParams,comment) {


//****************************user functionalty******************************
$scope.newcustomerName= $localStorage.loginUser;
//console.log()
$scope.uploadFile = function(){
  createUser.signUpuser($scope.registration.user.name,$scope.registration.user.username,$scope.registration.user.email,$scope.registration.user.password,$scope.registration.user.myFile,$scope.registration.user.gender)
  }
 //$scope.userLog = null;
$scope.userLogin=function(){
          Auth.setUser($scope.username,$scope.password)
           .then(function (result) {
          $scope.userLog = result;
          $scope.addCustomer();
          $location.path("/products");
            }, function (error) {
                $window.alert("Invalid credentials");
                console.log(error);
                
            });
}

$scope.myClientInfo = function() {
    var userLog = Auth.getClientInfo();      
    for(var i in userLog){
//if(userInfo[i].username == "mangal"){
    return userLog[i].username;
}
};

$scope.isUserLoggedIn = function() {
     return Auth.isUserLoggedIn();
   };
$scope.cancel = function () {
        $scope.username = "";
        $scope.password = "";
    };


//************************cart and customer functionalty******************************

 //for the card set month and year
$scope.months = [1,2,3,4,5,6,7,8,9,10,11,12];
$scope.years = [2014,2015,2016,2017,2018,2019,2020,2022,2023,2024,2025,2026,2027,2028,2029,2030,2031,2032,2033,2034,2035];

//**add to cart notification***************
$scope.success=function(){
  notificationMessage.primary();
}
$scope.succesProductAdd=function(){
 notificationMessage.successAddProduct();
}
$scope.succesShippingAdd=function(){
 notificationMessage.primaryshipping();
}
$scope.succesBillingAdd=function(){
 notificationMessage.primaryBilling();
}
$scope.errorBillingAdd=function(){
 notificationMessage.BillingErrorwarning();
}
$scope.errorProductAdd=function(){
 notificationMessage.ProductErrorwarning();
}
$scope.errorshippingAdd=function(){
 notificationMessage.shippingErrorwarning();
}
$scope.successCheckout=function(){
 notificationMessage.checkoutSuccess();
}
$scope.errorCheckout=function(){
 notificationMessage.checkoutError();
}
$scope.succesSaveOrder=function(){
  notificationMessage.successHtml();
}
$scope.erroraveOrder=function(){
  notificationMessage.errorHtml();
}
//****addcustomer*************
$scope.addCustomer=function(){
$http({
	 method:'post',
	 url:'/api/customers/add',
	 data:{username: $scope.username},
	}).success(function(data, status, headers, config) {
     $scope.customername = data;
     $sessionStorage.user=$scope.customername.username;
     console.log($sessionStorage.user)
      //$cookieStore.put('myCustomer', $scope.customername);
        //console.log($localStorage.user)
      })
       .error(function(data, status, headers, config) {
         $scope.customer = [];
        });
}
// //console.log($localStorage.user.username)
// //********************make the the userid pass as params ***************
// //$scope.userdata=;
// //console.log($scope.customername)
var myUser=$sessionStorage.user;
console.log(myUser)

// //**********for pagination on home page
$http.get('/api/products/get')
  .success(function(data, status, headers, config) {
    $scope.products = data;
   $scope.currentPage = 1;
  $scope.totalItems = $scope.products.length;
  //console.log($scope.totalItems);
  $scope.entryLimit = 9; 
  $scope.noOfpages = Math.ceil($scope.totalItems / $scope.entryLimit);
  $scope.products = data;

     //$scope.product = data[0];
    })
      .error(function(data, status, headers, config) {
      $scope.products = [];
      });
    $scope.product=$localStorage.singproduct;
//     //console.log($scope.jj)

// //**************get single product
$scope.setProduct = function(id){
     //$scope.product = this.product;
     //console.log($scope.products);
     for(var i in $scope.products){
     	if($scope.products[i]._id== id){
     		$scope.myProduct=$scope.products[i];
     		$localStorage.singproduct=$scope.myProduct;
        console.log($localStorage.singproduct)
     	}
     }
        $location.path("/product");
            };

//***************get  the customers****************
$http.get('/api/customers/get/'+myUser).success(function(data, status, headers, config) {
     $scope.customer = data;
    //console.log($scope.customer)
      })
.error(function(data, status, headers, config) {
     $scope.customer = [];
      });


 //***************go to the oder page****************   
 $scope.setOrder = function(){
     $location.path('/singleUserorder');
         };
 
 //***************go to the cart page****************   
 $scope.setCart = function(){
     $location.path('/cart');
        };  
      

//*******************make the cart total *************
$scope.cart=[];
 $scope.itemCart=$localStorage.mycartItem
var cartdata;
$scope.cartTotal = function(){
       var total = 0;
  for(var i=0; i<$scope.itemCart.length; i++){
        var item = $scope.itemCart[i];
        total += item.quantity * item.product[0].price;
          } 
  $scope.subtotal = total;   
   $localStorage.sub= $scope.subtotal;        
   $scope.shipping =  $scope.subtotal*.05;   
   $localStorage.totalCart= $scope.subtotal+$scope.shipping;
    return  $scope.subtotal+$scope.shipping;
     };

//******************add to cart ***********************
$scope.isCollapsed = true;
$scope.count=0;

//************add to cart 
$scope.addToCart = function(productId){
var myvar=$interval(function(){
  $scope.count++;
  if($scope.count == 3){
    $interval.cancel(myvar);
    $scope.count=0;
  }
},800)
var found = false;
     for(var i=0; i<$scope.cart.length; i++){
      var item = $scope.cart[i];
       console.log(item);
       if (item.product[0]._id == productId){
          item.quantity += 1;
           found = true;
            }
      }
   if (!found){
   $scope.cart.push({quantity: 1,product: [this.product]});
   $localStorage.mycartItem=$scope.cart;
        }
        }
      
//**************************delete cart one by one ********************
$scope.deleteFromCart = function(productId){
   for(var i=0; i<$scope.itemCart.length; i++){
      var item = $scope.itemCart[i];
         if (item.product[0]._id == productId){
           $scope.itemCart.splice(i,1);
             break;
               }
                }           
    };
//   //**************************checkout the cart********************
 $scope.checkout = function(){
    $http({
 	method:'post',
 	url:'/api/customers/update/cart/'+ myUser,
 	data:{updatedCart: $scope.itemCart},
 	}).success(function(response) {
       $scope.mycart = response.data;
  if($scope.isUserLoggedIn()){
      $scope.successCheckout();
      $location.path('/address');
     }else{
       alert("plz login first")
       $location.path('/address');
     }
            })
      .error(function(data, status, headers, config) {
      $scope.errorCheckout
          // alert(data);
           });
  };

//   //**************************set the shipping********************
$scope.setShipping = function(){
//console.log($scope.customer.shipping[0];
   $http.post('/api/customers/update/shipping/' + myUser,
   { 
   updatedShipping :$scope.customer.shipping[0] })
   .success(function(data, status, headers, config)
    {
    $scope.contentShow=data;
    $scope.succesShippingAdd()
    console.log($scope.contentShow);
    $location.path('/billing');
    })
    .error(function(data, status, headers, config) {
         $scope.errorshippingAdd()
      //$window.alert(data);
           });
              };
//        //******paypal route
   $http({
       method:'get',
       url:'/orders/get'
  }).success(function(response) {
       $scope.orders = response.data;
           //$scope.succesSaveOrder();
       console.log("orders" + $scope.orders)
        //$scope.content = '/javascripts/view/orders.html';
        // $location.path('/products');
       }).error(function(response) {
         $scope.orders = [];
              //$scope.errorSaveOrder();;
               });
 $scope.paypalBilling = function(){
  //$scope.makePurchase();
  $scope.cartAmount=$localStorage.totalCart
 //console.log($scope.orders)
 	   	///$window.alert('data');
 	// var  basicAuthString =
   //btoa('AQbcEm-wBul0oksUiYbjuRJRGes2RbE9GROHrtzi9kr6VnA2DV7i3iO70mwh5R25vRdsZbytBwizHo6R:EONI9-G6VCmG-7C8o2E0QgWdaHbzmlOPJg59qxEs2tiSSIYCU-rdZYEzRla0BlDspGBoFRwzuWDql-Kt');
         $http({
         url: "/api/v1/payments/payment",
         method: 'post',
         data:{amount:$scope.cartAmount,order:$scope.itemCart,currency:"USD",description:"my paypal description"}
         }).success(function (res) {
          console.log(res)
        window.location.href=res;
         }).error(function (error) {
             console.log("erreur "+ error);
         });
           

//             console.log(data)).error(...);
// var client_credential="<AYMVRsohzwE6L4bpO-ShS0JOqfdMM40LEMea9qRzOrg3zJFm--LCB4OmVnqTRQkHuBk8mBNH5o9ub-2e>:<EOVKXJGVHoDvpHwIlA46PimrsvX0EoVUw1AMAMBe2hOLPJs6tDAtPZ>";

}
//   //**************************varify billing********************
$scope.verifyBilling = function(){
$scope.cartAmount=$localStorage.totalCart
$http.post('/api/customers/update/billing/' + myUser,
    {cardtype:$scope.customer.billing[0].cardtype,name:$scope.customer.billing[0].name,cvv:$scope.customer.billing[0].cvv,number:$scope.customer.billing[0].number,expiremonth:$scope.customer.billing[0].expiremonth,expireyear:$scope.customer.billing[0].expireyear,amount:$scope.cartAmount,address:$scope.customer.billing[0].address[0]}).success(function(data, status, headers, config) {
  //$scope.content = '/javascripts/view/review.html';
$scope.succesBillingAdd()
  updatedBilling='';
  $location.path('/review');
      //$localStorage.tt=" "
     })
     .error(function(data, status, headers, config) {
      $scope.errorBillingAdd();
        //$window.alert(data);
        });
           };
 
$scope.oneOrder=$localStorage.hored
$scope.makePurchase = function(){   
     $http.post('/api/orders/add/' + myUser,
            { orderBilling: $scope.customer.billing[0],
               orderShipping: $scope.customer.shipping[0],
                orderItems: $scope.customer.cart })
              .success(function(data, status, headers, config) {    
                $scope.customer.cart = [];
                 // $scope.succesSaveOrder();
               // $scope.succesSaveOrder();
                $localStorage.mycartItem='';
                //      $http.get('/api/orders/get/'+myUser)
                //          .success(function(data, status, headers, config) {
                //               $scope.order = data;
                //              $scope.succesSaveOrder();
                //               $localStorage.hored= $scope.order;
                //               console.log($scope.order)

                //              $location.path('/singleUserorder')    
                //     })
                // .error(function(data, status, headers, config) {
                //             $scope.orders = [];
                //              $scope.errorSaveOrder();

                //                       });
   $http({
       method:'get',
       url:'/orders/get'
  }).success(function(response) {
       $scope.orders = response.data;
           //$scope.succesSaveOrder();
       console.log("orders" + $scope.orders)
        //$scope.content = '/javascripts/view/orders.html';
        // $location.path('/products');
       }).error(function(response) {
         $scope.orders = [];
              //$scope.errorSaveOrder();;
               });
                               
              }) .error(function(data, status, headers, config) {
                      // $window.alert(data);
                     //$scope.errorSaveOrder();
                        });
             };
 //*****************View Blog Item   

$scope.viewitemBlog=function(){
   blogServices.viewBlog()
  .then(function (result) {
  $scope.Blog = result.data;
  $scope.currentPage = 1;
  $scope.totalItems = $scope.Blog.length;
  $scope.entryLimit = 9; 
  $scope.noOfpages = Math.ceil($scope.totalItems / $scope.entryLimit);
         // / $scope.myComments=$localStorage.itemComment;
        if($routeParams.id!=undefined){
          $scope.Blog.forEach(function(value,index) {
            console.log($scope.Blog);
            if(value._id == $routeParams.id){
              $scope.oneBlog = value;
               $scope.getaddComment();
             
            }
          
          })
        }
      }, function (error) {
          $window.alert("Invalid data");
          console.log(error);
                
 });
}
$scope.viewitemBlog();
$scope.singlebLogView = function(id) {
    $location.path("/"+ id);
} 

//****************___comment Box api BY -------Mangal singh________________________________________
$scope.addComment=function(){
 //$scope.getReplyComment();
var userLog = Auth.getClientInfo(); 
$scope.userComm=userLog.data; 
comment.addCommentData($scope.myform.name,$scope.myform.email,$scope.myform.comments,$scope.oneBlog._id,$scope.userComm)
  .then(function (result) {
  $scope.comm = result.data;
  $scope.getaddComment();
  //$scope.getReplyComment();
  $scope.myform={};
   //$route.reload();
      }, function (error) {
        $window.alert("error to add comments");
          console.log(error);        
 });

}
//if click add the class of comment box;
$scope.classss = "red";
$scope.checkClass=function(){
   if ($scope.classss === "red"){
      $scope.classss = "blue";
    }
    else{
      $scope.classss = "red";
    }
}

//if click get all add comment as per post id
$scope.getaddComment=function(){
  comment.getaddCommentItem($scope.oneBlog._id)
  .then(function (result) {
  $scope.myCommentData  = result.data;
   //$localStorage.itemComment=  $scope.myCommentData;
      }, function (error) {
        $window.alert("error to add comments");
          console.log(error);
                
 });

}
//click show all the viewComment
$scope.showMore = false;
           $scope.toggleCustom = function() {
            $scope.showMore = $scope.showMore === false ? true: false;
        };

 //click this hide comment box
$scope.cancebox=function(){
   $scope.showBox=false;
}


////add comment only if user is login
 $scope.showBox=false;
 $scope.showBoxEdit=false;
$scope.showCommentBox=function(){
  if($scope.isUserLoggedIn()){
   $scope.showBox=true;
  }else{
    alert("plz ogin first")
  }
 
}

//likes the comment by commentId
$scope.likesComm=function(id){
  comment.likesComment.then(function(res) {
  $scope.myCommentData.forEach(function(value,index){
              if(value._id == id){
                value.likes +=1;
              }
           })
  },function(error) {
            console.log(error);
        });
}
//dislikes the comment by commentId
$scope.dislikesComm=function(id){
  comment.dislikesComment(id).then(function(res) {
 $scope.myCommentData.forEach(function(value,index){
              if(value._id == id){
                value.dislikes +=1;
              }
      })
},function(error) {
            console.log(error);
        });
}


//remove the comment by comment _id
$scope.removeComm=function(id){
comment.remobveCommentItems(id).then(function(res) {
            $scope.myCommentData.forEach(function(value,index){
              if(value._id == id){
               $scope.myCommentData.splice(index,1);
              }
            })
        }, function(error) {
            console.log(error);
        });
}

//edit comment 
$scope.editComment= function(id) {
      comment.editCommentitem(id).then(function successCallback(response) {
      if(response.data.error){
        $scope.error = response.data.error;
      }else{
       $scope.updateComment=response.data;
       console.log($scope.updateComment)
       $scope.showBoxEdit=true;
       // $localStorage.commentdd=$scope.myCommentData;
        
      }
      //console.log(response);
    }, function errorCallback(response) {
      console.log('error',response);
    });
}
//save and update comment
$scope.savaUpdateComment = function(id) {
      comment.saveandUpdateComment(id,$scope.updateComment.comments).then(function successCallback(response) {
      if(response.data.error){
        $scope.error = response.data.error;
      }else{
        $scope.myCommentData=response.data;
          $scope.showBoxEdit=false;
          $scope.getaddComment();

      }
      //console.log(response);
     }, function errorCallback(response) {

      console.log('error',response);
     });
}

//if click show the reply input box
$scope.replyComment= function(id) {
      comment.replyCommnetsOnClik(id).then(function successCallback(response) {
      if(response.data.error){
        $scope.error = response.data.error;
      }else{
       $scope.replysevComment=response.data;
      // console.log($scope.replysevComment)
        $scope.getaddComment();
        $scope.showBoxReply=false;
        $scope.sowreply=false;
       // $localStorage.commentdd=$scope.myCommentData;
        
      }
      //console.log(response);
    }, function errorCallback(response) {
      console.log('error',response);
    });
}
$scope.myform={};
//if click sadd the reply comment by comment_id
$scope.replyAddComment=function(id){
       $scope.comm_id=id;
      var userLog = Auth.getClientInfo(); 
      $scope.userComm=userLog.data; 
       comment.addReplyComment($scope.myform.replycomments,$scope.userComm,$scope.comm_id)
     .then(function (result) {
     $scope.replycomm = result.data;
//$scope.getaddComment();
 //$scope.getReplyComment();
     $scope.getaddComment();
     $scope.showBoxReply=true;
     $scope.myform={};
   //$route.reload();
      }, function (error) {
        $window.alert("error to reply comments");
          console.log(error);
                
 });
}
//get the reply comment by comment _id
$scope.getReplyComment=function(){
   comment.getReplyCommentItem($scope.comment_id)
   .then(function (result) {
   $scope.replyCommentData  = result.data;
//console.log($scope.replyCommentData);
      }, function (error) {
        $window.alert("error to add comments");
          console.log(error);
                
 });

}


///*************update Blog*******************
// $scope.postReplyIndex=function(index){
//   $scope.d= index;
//   console.log($scope.d)
// }
$scope.showIndex=function(index){
  $scope.a= index;
  console.log($scope.a)
}
$scope.sowreply=true;
$scope.showReplyIndex=function(index){
  $scope.b= index;
  console.log($scope.b)
}
//if clik hide the reply box
$scope.cancelEditbox=function(id){
   $scope.showBoxEdit=false;
}
$scope.cancereplybox=function(id){
   $scope.showBoxReply=true;
    $scope.sowreply=true;
}

//if click show full comments Box toggle_____________
$scope.boxcomments=false;
$scope.showboxComment=function(){
 $scope.boxcomments = $scope.boxcomments === false ? true: false;
}

 }]);


//*************____________________________________________________________________________
