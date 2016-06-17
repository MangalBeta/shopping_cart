 // ****************Post Services********************************
  app.factory("blogServices", ["$q","$http",'$localStorage','notificationMessage','$routeParams','$window',function ($q,$http,$localStorage,notificationMessage,$routeParams,$window) {
 var Blog;
return  {
    addBlogitem:function(title,content,tags,file){
      var uploadBlogUrl = "api/addBlog";
      var deferred = $q.defer();
        var fd = new FormData();
        console.log(fd);
        fd.append('title',title);
        fd.append('content',content);
        fd.append('tags',tags);
        fd.append('file', file);
        //JSON.stringify({name:$scope.registration.user.name,email:$scope.registration.user.email,password:$scope.registration.user.password, file:file})
        $http.post(uploadBlogUrl,fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        }) .success(function(response){
           console.log("success!!");
            deferred.resolve(response);
        })
        .error(function(error){
          console.log("error!!");
           deferred.reject(error);
        });
        return deferred.promise;
      },

  viewBlog:function(){
  var deferred = $q.defer();
     $http({
    method:"get",
    url:'api/viewALLBlog',
  }).then(function (response) {  
       Blog=response.data;
     deferred.resolve(response);
    }, function (response) {
      console.log('error',response);
       deferred.reject(response);
    });
       return deferred.promise;
  }
}
 }]);

 