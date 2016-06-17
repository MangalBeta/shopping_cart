
// //*****for notification message**************
app.factory("Auth", ["$http","$q","$window",'$localStorage','$route','notificationMessage',function ($http, $q, $window,$localStorage,$route,notificationMessage) {
var userLog;
//var checkAdmin=false;
  function setUser(username, password) {
        var deferred = $q.defer();
        $http.post("/api/login", { username:username,password:password })
            .then(function (result) {
              userLog=result
           $window.sessionStorage["userLog"] = JSON.stringify(userLog);
            deferred.resolve(userLog);
            }, function (error) {
                deferred.reject(error);
            });

        return deferred.promise;
    }
function userlogout() {
        var deferred = $q.defer();
        $http({
            method: "get",
            url: "/api/logout",
            // headers: {
            //     "access_token": userInfo.accessToken
            // }
        }).then(function (result) {
            userLog = null;
        // $localStorage.checkAdmin=null;
     $window.sessionStorage["userLog"] = null;
             //$route.reload();
            deferred.resolve(result);
        }, function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    }
 function isUserLoggedIn() {
//console.log(userLog)
  return (userLog) ? true : false;
}
//isUserLoggedIn();
 function getClientInfo() {
        return userLog;
    }

  function initUser() {
        if ($window.sessionStorage["userLog"]) {
       userLog = JSON.parse($window.sessionStorage["userLog"]);
        }
    }
    initUser();
 return {
        setUser: setUser,
        userlogout: userlogout,
        getClientInfo: getClientInfo,
        isUserLoggedIn:isUserLoggedIn
    };
}]);
// //**********for signup services*************************8
app.service('createUser',function($location,$http,$localStorage,notificationMessage){
 this.signUpuser = function(name,username,email,password,file,gender){
       // var file = $scope.registration.user.myFile;
      var uploadUrl = "/api/signup";
        var fd = new FormData();
        fd.append('name',name);
        fd.append('username',username);
        fd.append('email',email);
        fd.append('password',password);
        fd.append('file', file);
        fd.append('gender', gender);
        //JSON.stringify({name:$scope.registration.user.name,email:$scope.registration.user.email,password:$scope.registration.user.password, file:file})
        $http.post(uploadUrl,fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        }) .success(function(res){
         $localStorage.userData=res;
      notificationMessage.info();
      
           //console.log($localStorage.userData)
          $location.path("/varifyEmail")
        })
        .error(function(){
          console.log("error!!");
            notificationMessage.errorTime();
      
        });
    };
})

//**********for login services*************************8

// app.service('Auth', function($http,$location, $localStorage,notificationMessage){
// var userLog;
// var log; 
// var checkUser
// var favoriteCookie
// this.setUser =function(username,password){
//        $http({
//   method:"POST",
//   url:'/api/login',
//   data:{username:username,password:password},
// }).then(function successCallback(response) {
//      userLog=response.data;
//        //exp = new Date(getSeconds()+10);
//      //  $localStorage.loginUser=userLog;
//       console.log(userLog.local.username)
//   if(userLog.local.username == username){
//         log= userLog; 
//   alert("You are successfully login");
//          notificationMessage.success();
//       $location.path('/products');
//        }else{
//             alert("You are not valid user plz sign in");
//            notificationMessage.errorTime();
//               $location.path('/signUp');
//         }
     
//   }, function errorCallback(response) {
//        console.log('error');
//         notificationMessage.errorTime();
//           $location.path('/login');
//         alert("username or password is not valid");
     
//   });

//     }
//   this.isLoggedIn= function(){
//    if(log){
//      return log =true;
//    }else{
//   return log =false;
//    }
//  //console.log(checkUser)
//     };
     
//   this.isLoggedOut = function(){
//     return log = false;
//     };
  
// });
app.service("notificationMessage",function(Notification){

              this.primary = function() {
                Notification('Successfully ! item is added to cart');
              };
                this.error = function() {
                    Notification.error('Error to notification');
                };
                this.success = function() {
                    Notification.success('Successfully ! log in');
                };
                 this.checkoutSuccess = function() {
                    Notification({message: 'Succefully...! cart to checkout', title: 'CheckOut'});
                };
                 this.checkoutError = function() {
                    Notification.error('Error to cart checkout ');
                };
              this.successAddProduct = function() {
                    Notification.success('Successfully ! Add new Product');
                };
                this.info = function() {
                    Notification.info('Successfully ! signup plz varify your email and login ');
                };
                this.ProductErrorwarning = function() {
                    Notification.warning('Error...! Product is not add ');
                };
                this.shippingErrorwarning = function() {
                    Notification.warning('Error...! Shipping info not add ');
                };
                 this.BillingErrorwarning = function() {
                    Notification.warning('Error...! Billing info not add');
                };
               this.primaryshipping = function() {
                    Notification({message: 'Succefully...! Add shipping address', title: 'Shipping detail'});
                };
             this.primaryBilling= function() {
                    Notification({message: 'Succefully...! Add Billing Detail', title: 'Billing detail'});
                };
          
                this.errorTime = function() {
                    Notification.error({message: 'Error to login ', delay: 1500});
                };
                this.errorNoTime = function() {
                    Notification.error({message: 'Error notification (no timeout)', delay: null});
                };
                this.successTime = function() {
                    Notification.success({message: 'Success notification 20s', delay: 20000});
                };

                this.errorHtml = function() {
                    Notification.error({message: '<b>Error</b> <s>To save order</s>'});
                };

                this.successHtml = function() {
                    Notification.success({message: 'Successfully ..!<br>Save order <b>content</b><br><a href="/products">Continue to Shopping</a><br>', title: 'Order'});
                };
                this.TopLeft = function() {
                    Notification.success({message: 'Successfully...! Log Out ', positionX: 'left'});
                };

                this.BottomRight = function() {
                    Notification.error({message: 'Error Bottom Right', positionY: 'bottom', positionX: 'right'});
                };

                this.BottomLeft = function() {
                    Notification.warning({message: 'warning Bottom Left', positionY: 'bottom', positionX: 'left'});
                };

                // == 

            this.nTitle = "Title from other scope";
            this.nClicksLog = [];
                this.nClick = function() {
                    $scope.nClicksLog.push("Clicked");
                };
});
//***************************************************************
