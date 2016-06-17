// //*********** Main controller*********************
app.controller('mainCtrl',function($q, $timeout, $http, $location,$scope,Auth,
$localStorage,$route,$rootScope,notificationMessage,myPageCtx,$sessionStorage){
   $scope.pageCtx = myPageCtx;
$scope.logOut=function(){
 Auth.userlogout()
            .then(function (result) {
                $scope.userLog = null;
                window.sessionStorage["userLog"]=null;
                  $scope.myAdmin = null;
                   $sessionStorage.user=null;
                  $localStorage.tt=null;
                $location.path("/login");
            }, function (error) {
                console.log(error);
            });
    };
$scope.setProducts = function(){
     $location.path('/products');
        };    

})
