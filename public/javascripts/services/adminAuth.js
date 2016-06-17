app.factory("adminAuth", ["$http","$q","$window",'$localStorage','$route',function ($http, $q, $window,$localStorage,$route) {
    var userInfo;
  //var checkAdmin=false;
    function adminLogin(username, password) {
        var deferred = $q.defer();
        $http.post("/api/admin", { username:username,password:password })
            .then(function (result) {
              userInfo=result
           $window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
            deferred.resolve(userInfo);
           //ss $location.path("/Home");
            }, function (error) {
                deferred.reject(error);
            });

        return deferred.promise;
    }
function logout() {
        var deferred = $q.defer();
        $http({
            method: "POST",
            url: "/api/adminlogout",
            // headers: {
            //     "access_token": userInfo.accessToken
            // }
        }).then(function (result) {
            userInfo = null;
        // $localStorage.checkAdmin=null;
     $window.sessionStorage["userInfo"] = null;
             //$route.reload();
            deferred.resolve(result);
        }, function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    }
 function isadminLoggedIn() {
  return (userInfo) ? true : false;
}
//isadminLoggedIn();

 function getUserInfo() {
        return userInfo;
    }

  function init() {
        if ($window.sessionStorage["userInfo"]) {
            userInfo = JSON.parse($window.sessionStorage["userInfo"]);
        }
    }
    init();
 return {
        adminLogin: adminLogin,
        logout: logout,
        getUserInfo: getUserInfo,
        isadminLoggedIn:isadminLoggedIn
    };
}]);
