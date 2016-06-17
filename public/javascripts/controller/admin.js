//**http://marmelab.com/ng-admin-demo/index.html#/dashboard
app.controller("adminController", ["$scope", "$location", "$window", "adminAuth","myPageCtx",'$localStorage','$http','notificationMessage','$routeParams','blogServices',function ($scope, $location, $window, adminAuth,myPageCtx,$localStorage,$http,notificationMessage,$routeParams,blogServices) {
  myPageCtx.headerUrl = '/javascripts/view/adminHeader.html';
   myPageCtx.footerUrl = '/javascripts/view/adminFooter.html';
 
//user credentilia_____________________________________________
//$scope.myUser=$localStorage.checkAdmin;
$scope.myAdmin = window.sessionStorage["userInfo"];
//console.log($scope.myAdmin)
$scope.userInfo = null;
    //$scope.adminuser= $window.sessionStorage["userInfo"]
    $scope.adminLogin = function () {
        adminAuth.adminLogin($scope.adminname, $scope.adminpassword)
           .then(function (result) {
          $scope.userInfo = result;
            $location.path("/Home");
            }, function (error) {
                $window.alert("Invalid credentials");
                console.log(error);
                
            });
           // $scope.chekAdmin=true;
    };
$scope.myuserInfo = function() {
    var userInfo = adminAuth.getUserInfo();      
for(var i in userInfo){
//if(userInfo[i].username == "mangal"){
  return userInfo[i].username;

}
};

 $scope.adminLoggedIn = function() {
     return adminAuth.isadminLoggedIn();
   };

$scope.cancel = function () {
        $scope.adminname = "";
        $scope.adminpassword = "";
    };

//***addproducy 
$scope.addProducts = function(){
 var uploadUrl = "/api/addproduct";
        var fd = new FormData();
        console.log(fd);
         var file = $scope.myFile;
        fd.append('title',$scope.title);
        fd.append('description',$scope.description);
        fd.append('file', file);
       fd.append('price', $scope.price);
        //JSON.stringify({name:$scope.registration.user.name,email:$scope.registration.user.email,password:$scope.registration.user.password, file:file})
    $http.post(uploadUrl,fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        }) .success(function(){
          notificationMessage.successAddProduct();
       $scope.title=" ";
           $scope.price=" ";
       $scope.description=" ";
        })
        .error(function(){
    notificationMessage.ProductErrorwarning();
          console.log("error!!");
        });
    };
    //logout admin
//$scope.userInfo = auth;
$scope.adminlogout = function () {
    //alert("hello");
    adminAuth.logout()
            .then(function (result) {
                $scope.userInfo = null;
                window.sessionStorage["userInfo"]=null;
                  $scope.myAdmin = null;
                $location.path("/dashboard");
            }, function (error) {
                console.log(error);
            });
    };
  


//get all product list in admin table ____________________________________________________________-
$http.get('/api/products/get')
  .success(function(data, status, headers, config) {
    $scope.products = data;
    //console.log(  $scope.products)
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


//****delete product from admin page
$scope.removeProduct= function(id) {
        $http({ 
                url: 'api/products/delete/'+ id ,
                method: 'delete'
        }).then(function(res) {
            $scope.products.forEach(function(value,index){
              if(value._id == id){
                $scope.products.splice(index,1);
              }
            })
        }, function(error) {
            console.log(error);
        });
    };

    //*****

 //***********edit and update product 

$scope.updateProduct= $localStorage.proData;
$scope.editProduct = function(id) {
$http({
    method:"get",
    url:'api/products/editProduct/'+id,
  }).then(function successCallback(response) {
      if(response.data.error){
        $scope.error = response.data.error;
      }else{
        $scope.myProduct=response.data;

        $localStorage.proData=$scope.myProduct;
        
        //console.log( $scope.updateValue)
        $location.path('/editProduct');
      }
      //console.log(response);
    }, function errorCallback(response) {
      console.log('error',response);
    });


}
///*************update Blog*******************
$scope.saveUpdateProduct = function(id) {
$http({
    method:"put",
    url:'api/products/editProduct/'+id,
    data:{name:$scope.updateProduct.name,description:$scope.updateProduct.description,price:$scope.updateProduct.price}
  }).then(function successCallback(response) {
      if(response.data.error){
        $scope.error = response.data.error;
      }else{
        $scope.myproduct=response.data;
        //console.log( $scope.updateValue)
        $location.path('/productsList');
      }
      //console.log(response);
    }, function errorCallback(response) {
      console.log('error',response);
    });
}



//****************-_________________________________________________________________________________
//****Get all user in admin panel
$http.get('/api/users/get')
  .success(function(data, status, headers, config) {
    $scope.users = data;
  //console.log(  $scope.products)
   $scope.currentPage = 1;
  $scope.totalItems = $scope.users.length;
  //console.log($scope.totalItems);
  $scope.entryLimit = 9; 
  $scope.noOfpages = Math.ceil($scope.totalItems / $scope.entryLimit);
  $scope.users = data;
     //$scope.product = data[0];
    })
      .error(function(data, status, headers, config) {
      $scope.users = [];
      });

//*******************delete user
$scope.removeUsers= function(id) {
        $http({ 
                url: 'api/users/delete/'+ id ,
                method: 'delete'
        }).then(function(res) {
            $scope.users.forEach(function(value,index){
              if(value._id == id){
                $scope.users.splice(index,1);
              }
            })
        }, function(error) {
            console.log(error);
        });
    };
//********************update user
$scope.updateUser= $localStorage.proUsers;
$scope.editUsers = function(id) {
$http({
    method:"get",
    url:'api/users/editUser/'+id,
  }).then(function successCallback(response) {
      if(response.data.error){
        $scope.error = response.data.error;
      }else{
        $scope.myUsers=response.data;

        $localStorage.proUsers=$scope.myUsers;
        
        //console.log( $scope.updateValue)
        $location.path('/editUser');
      }
      //console.log(response);
    }, function errorCallback(response) {
      console.log('error',response);
    });


}
///*************update users*******************
$scope.saveUpdateUsers = function(id) {
$http({
    method:"put",
    url:'api/users/editUser/'+id,
    data:{name:$scope.updateUser.local.name}
  }).then(function successCallback(response) {
      if(response.data.error){
        $scope.error = response.data.error;
      }else{
        $scope.myusers=response.data;
        //console.log( $scope.updateValue)
        $location.path('/userList');
      }
      //console.log(response);
    }, function errorCallback(response) {
      console.log('error',response);
    });
}
//get user profile
 $scope.userdata=$localStorage.proUsers;
 //console.log($scope.userdata)
$scope.userProfile = function(id){
   $http({
    method:"get",
    url:'api/users/profile/get/'+id,
  }).then(function successCallback(response) {
      if(response.data.error){
        $scope.error = response.data.error;
      }else{
        $scope.myUserProfile=response.data;
        $localStorage.proUsers=$scope.myUsers;
        //console.log( $scope.myUserProfile)
        $location.path('/userProfile');
      }
      //console.log(response);
    }, function errorCallback(response) {
      console.log('error',response);
    });
     
            };
//******************get orders
$scope.quant=0;
//$scope.cc=0;
$http.get('/api/orders/get')
 .success(function(data, status, headers, config) {
 $scope.orders = data;
   })
    .error(function(data, status, headers, config) {
    $scope.orders = [];
       });
$scope.getQuantity=function(){
$http.get('/api/orders/get/quantity')
 .success(function(data, status, headers, config) {
 $scope.itemsquantity = data;
 console.log($scope.itemsquantity)
   })
    .error(function(data, status, headers, config) {
    $scope.itemsquantity = "";
       });
}
//***********____________________________________________________________________________________________________
 
 //add Post 
 $scope.blogFile = function(){
         blogServices.addBlogitem($scope.title,$scope.content,$scope.tags,$scope.myFile)
         .then(function (result) {
          $scope.itemPost = result;
            $location.path("/listBlog");
            }, function (error) {
                $window.alert("error");
                console.log(error);
            });
        
 };
///view list of blog++++++++++++++++++++++++++++
angular.element(document).ready(function(){
   blogServices.viewBlog()
  .then(function (result) {
  $scope.Blog = result.data;
  $scope.currentPage = 1;
  $scope.totalItems = $scope.Blog.length;
  $scope.entryLimit = 9; 
  $scope.noOfpages = Math.ceil($scope.totalItems / $scope.entryLimit);
      if($routeParams.id!=undefined){
          $scope.Blog.forEach(function(value,index) {
            console.log($scope.Blog);
            if(value._id == $routeParams.id){
              $scope.oneBlog = value;
              console.log($scope.oneBlog);
            }
          
          })
        }
      }, function (error) {
          $window.alert("Invalid data");
          console.log(error);
                
 });
})

//****************removePOst 
$scope.removeBlog = function(id) {
        $http({ 
                url: 'api/delete/post/'+ id ,
                method: 'delete'
        }).then(function(res) {
            $scope.Blog.forEach(function(value,index){
              if(value._id == id){
                $scope.Blog.splice(index,1);
              }
            })
        }, function(error) {
            console.log(error);
        });
    };
$scope.singlebLogView = function(id) {
    $location.path("/"+ id);
} 

$scope.updateValue=$localStorage.dd;
$scope.editBlog = function(id) {
 $http({
    method:"get",
    url:'api/edit/post/'+id,
  }).then(function successCallback(response) {
      if(response.data.error){
        $scope.error = response.data.error;
      }else{
        $scope.Blog=response.data;

        $localStorage.dd=$scope.Blog;
        
        //console.log( $scope.updateValue)
        $location.path('/editPost');
      }
      //console.log(response);
    }, function errorCallback(response) {
      console.log('error',response);
    });
}
///*************update Blog*******************

$scope.savaUpdatePost = function(id) {
   $http({
    method:"put",
    url:'api/edit/post/'+id,
    data:{title:$scope.updateValue.title,content:$scope.updateValue.content,tags:$scope.updateValue.tags}
  }).then(function successCallback(response) {
      if(response.data.error){
        $scope.error = response.data.error;
      }else{
        $scope.Blog=response.data;
        //console.log( $scope.updateValue)
        $location.path('/listBlog');
      }
      //console.log(response);
    }, function errorCallback(response) {
      console.log('error',response);
    });
}
    //**********************________________________________________________________________________________________
 }]);
