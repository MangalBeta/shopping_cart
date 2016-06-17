var app = angular.module('myApp', ['ngRoute','ngStorage','ui.bootstrap','ui-notification']);

//****For used multiple header and footer for diffrent view
app.provider('myPageCtx', function() {
  
  var defaultCtx = {
    headerUrl: '/javascripts/view/defaultHeader.html',
    footerUrl: '/javascripts/view/defaultFooter.html'
  };
  var currentCtx = angular.copy(defaultCtx);
  return {
    $get: function($rootScope) { 
      // We probably want to revert back to the default whenever
      // the location is changed.
      
      $rootScope.$on('$locationChangeStart', function() {
        angular.extend(currentCtx, defaultCtx);
      }); 
      
      return currentCtx; 
    }
  };
});
//chek the user is admin or not and client
app.run(["$rootScope", "$location", function ($rootScope, $location) {

    $rootScope.$on("$routeChangeSuccess", function (userInfo) {
        console.log(userInfo);
    });
   $rootScope.$on("$routeChangeError", function (event, current, previous, eventObj) {
     // console.log(eventObj)
        if (eventObj.authenticated != false) {
            $location.path("/Home");
        }
        else{
          $location.path("/dashboard");
        }

         if(eventObj.userauthenticated ==false) {
            $location.path("/login");
          }
        // }else{
        //   $location.path("/products");
        // }
        
    });
}]);
//***make the route url
app.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
  $routeProvider.
                   when('/dashboard', {
                    templateUrl: 'javascripts/view/dashboard.html', 
                     controller: 'adminController',
                      resolve: {
                       auth: function ($q, adminAuth,$location) {
                      var userLoged = adminAuth.isadminLoggedIn();
                      console.log(userLoged)
                      if (userLoged) {
                       $location.path('/Home');
                      } else {
                         $location.path('/dashboard');
                        }
                     }
                   }
                   }).
                  when('/Home', {
                  templateUrl: 'javascripts/view/Home.html', 
                  controller: 'adminController',
                    resolve: {
                       auth: function ($q, adminAuth) {
                      var userInfo = adminAuth.getUserInfo();
                      if (userInfo) {
                        return $q.when(userInfo);
                      } else {
                       return $q.reject({ authenticated: false });
                       }
                     }
                   }
                   }).
                   when('/userList', {
                    templateUrl: 'javascripts/view/userList.html', 
                     controller: 'adminController',
                     resolve: {
                       auth: function ($q, adminAuth) {
                      var userInfo = adminAuth.getUserInfo();
                      if (userInfo) {
                      return $q.when(userInfo);
                      } else {
                       return $q.reject({ authenticated: false });
                       }
                     }
                   }
                 }).
                   when('/editUser', {
                    templateUrl: 'javascripts/view/editUser.html', 
                     controller: 'adminController',
                     resolve: {
                       auth: function ($q, adminAuth) {
                      var userInfo = adminAuth.getUserInfo();
                      if (userInfo) {
                      return $q.when(userInfo);
                      } else {
                       return $q.reject({ authenticated: false });
                       }
                     }
                   }
                 }).
                   when('/userProfile', {
                    templateUrl: 'javascripts/view/userProfile.html', 
                     controller: 'adminController',
                     resolve: {
                       auth: function ($q, adminAuth) {
                      var userInfo = adminAuth.getUserInfo();
                      if (userInfo) {
                      return $q.when(userInfo);
                      } else {
                       return $q.reject({ authenticated: false });
                       }
                     }
                   }
                 }).
                   when('/addProduct', {
                    templateUrl: 'javascripts/view/addProduct.html', 
                     controller: 'adminController',
                     resolve: {
                       auth: function ($q, adminAuth) {
                      var userInfo = adminAuth.getUserInfo();
                      if (userInfo) {
                      return $q.when(userInfo);
                      } else {
                       return $q.reject({ authenticated: false });
                       }
                     }
                   }
                   }).
                   when('/addBlog', {
                    templateUrl: 'javascripts/view/addPost.html', 
                     controller: 'adminController',
                     resolve: {
                       auth: function ($q, adminAuth) {
                      var userInfo = adminAuth.getUserInfo();
                      if (userInfo) {
                      return $q.when(userInfo);
                      } else {
                       return $q.reject({ authenticated: false });
                       }
                     }
                   }
                   }).
                    when('/listBlog', {
                    templateUrl: 'javascripts/view/postList.html', 
                     controller: 'adminController',
                     resolve: {
                       auth: function ($q, adminAuth) {
                      var userInfo = adminAuth.getUserInfo();
                      if (userInfo) {
                      return $q.when(userInfo);
                      } else {
                       return $q.reject({ authenticated: false });
                       }
                     }
                   }
                 }).
                    when('/editPost', {
                    templateUrl: 'javascripts/view/editPost.html', 
                     controller: 'adminController',
                     resolve: {
                       auth: function ($q, adminAuth) {
                      var userInfo = adminAuth.getUserInfo();
                      if (userInfo) {
                      return $q.when(userInfo);
                      } else {
                       return $q.reject({ authenticated: false });
                       }
                     }
                   }
                 }).
                   when('/productsList', {
                    templateUrl: 'javascripts/view/productsList.html', 
                     controller: 'adminController',
                     resolve: {
                       auth: function ($q, adminAuth) {
                      var userInfo = adminAuth.getUserInfo();
                      if (userInfo) {
                      return $q.when(userInfo);
                      } else {
                       return $q.reject({ authenticated: false });
                       }
                     }
                   }
                   }).
                   when('/editProduct', {
                    templateUrl: 'javascripts/view/editProduct.html', 
                     controller: 'adminController',
                     resolve: {
                       auth: function ($q, adminAuth) {
                      var userInfo = adminAuth.getUserInfo();
                      if (userInfo) {
                      return $q.when(userInfo);
                      } else {
                       return $q.reject({ authenticated: false });
                       }
                     }
                   }
                   }).
                    when('/viewBlog', {
                    templateUrl: 'javascripts/view/blogView.html', 
                     controller: 'shoppingController',
                    }).
                   when('/varifyEmail', {
                    templateUrl: 'javascripts/view/varify.html', 
                     controller: 'shoppingController'
                   }).
                   when('/login', {
                    templateUrl: 'javascripts/view/login.html', 
                     controller: 'shoppingController' ,
                      resolve: {
                       auth: function ($q, Auth,$location) {
                      var clientUserInfo = Auth.isUserLoggedIn();
                      if (clientUserInfo) {
                       $location.path('/products');
                      } else {
                         $location.path('/login');
                        }
                     }
                   }  
                   }).
                    when('/signUp', {
                    templateUrl: 'javascripts/view/addCustomer.html', 
                     controller: 'shoppingController'
                   }).
                  when('/address', {
                    templateUrl: 'javascripts/view/address.html', 
                    controller: 'shoppingController',
                    resolve: {
                       userauth: function ($q, Auth) {
                      var userLog = Auth.getClientInfo();
                      if (userLog) {
                        return $q.when(userLog);
                      } else {
                       return $q.reject({ userauthenticated: false });
                       }
                     }
                   }
  
                   }).
                   when('/billing', {
                    templateUrl: 'javascripts/view/billing.html', 
                     controller: 'shoppingController',
                         resolve: {
                       userauth: function ($q, Auth) {
                      var userLog = Auth.getClientInfo();
                      if (userLog) {
                        return $q.when(userLog);
                      } else {
                       return $q.reject({ userauthenticated: false });
                       }
                     }
                   }
                   }).
                   when('/cart', {
                    templateUrl: 'javascripts/view/cart.html', 
                     controller: 'shoppingController',

                   }).
                   when('/orders', {
                    templateUrl: 'javascripts/view/orders.html', 
                     controller: 'adminController',
                             resolve: {
                       auth: function ($q, adminAuth) {
                      var userInfo = adminAuth.getUserInfo();
                      if (userInfo) {
                      return $q.when(userInfo);
                      } else {
                       return $q.reject({ authenticated: false });
                       }
                     }
                   }
                   }).
                   when('/singleUserorder', {
                    templateUrl: 'javascripts/view/singleorder.html', 
                     controller: 'shoppingController'
      
                   }).
                   when('/product', {
                    templateUrl: 'javascripts/view/product.html', 
                     controller: 'shoppingController'
                   }).
                   when('/products', {
                    templateUrl: 'javascripts/view/products.html', 
                     controller: 'shoppingController'
                     
                   }).
                    when('/review', {
                    templateUrl: 'javascripts/view/review.html', 
                     controller: 'shoppingController',
                         resolve: {
                       userauth: function ($q, Auth) {
                      var userLog = Auth.getClientInfo();
                      if (userLog) {
                        return $q.when(userLog);
                      } else {
                       return $q.reject({ userauthenticated: false });
                       }
                     }
                   }
                    //  resolve: 
                    //     logedin:checkLoggedin
                    // }
                   }).
                    when('/:id', {
                   templateUrl:'javascripts/view/singleViewBlog.html',
                  controller: 'shoppingController'
                   }).
                    otherwise({
                    	 redirectTo: '/products'
                    });
                 $locationProvider.html5Mode({
                 enabled: true,
                requireBase: false
              });



}]);

// //check the customer is login
// var checkLoggedin = function($q, $timeout, $http, $location, $rootScope){
//   //$rootScope.checkuser=false;
//       // Initialize a new promise
//       //alert();
//       var deferred = $q.defer();
//       $http.get('/api/loggedin').success(function(user){
//         // Authenticated
//       if(user !== '0'){
//           //$timeout(deferred.resolve, 0);
//       console.log("you are log in " + user);
//        //$rootScope.checkuser=true;
//        deferred.resolve();
//        }
//         // Not Authenticated
//       else {
//           $rootScope.message = 'You need to log in.';
//           console.log("you are not log in " + user);
//           deferred.reject();
//          // $timeout(function(){deferred.reject();}, 0);
//           $location.url('/login');
//         }
//       });
//       return deferred.promise;
//     };

//***********main controller***********************

