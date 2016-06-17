app.factory("comment",["$q","$http","$location",function($q,$http,$location){
  var getcommentData;
   return {
       addCommentData:function(name,email,comments,post_id,user_id){
      var deferred = $q.defer();
   $http({
    method:"post",
    url:'api/comment/blog',
   data:{name:name, email:email, comments:comments,post_id:post_id,user_id:user_id},
  }).then(function (response) {
          commetData=response.data;
          deferred.resolve(response);
          console.log(commetData)
    }, function (response) {
    deferred.reject(response);
      console.log('error',response);
    });
return deferred.promise;
},
  addReplyComment:function(replyComment,user_id,comment_id){
      var deferred = $q.defer();
   $http({
    method:"post",
    url:'api/reply/comment',
   data:{replyComment:replyComment,user_id:user_id,comment_id:comment_id},
  }).then(function (response) {
          replycommetData=response.data;
          deferred.resolve(response);
          console.log(replycommetData)
    }, function (response) {
    deferred.reject(response);
      console.log('error',response);
    });
return deferred.promise;
},
getReplyCommentItem:function(id){
   var deferred = $q.defer();
    $http({
    method:"get",
    url:'api/reply/comment/'+id,
    }).then(function (response) {
       getreplyData=response.data;
      deferred.resolve(response);
     console.log(getreplyData)
       ///$location.path("/");
      //console.log(response);
    },function errorCallback(response) {
          deferred.reject(response);
      console.log('error',response);
    });
  return deferred.promise;
},

getaddCommentItem:function(id){
   var deferred = $q.defer();
    $http({
    method:"get",
    url:'api/comment/blog/'+id,
    }).then(function (response) {
       getcommentData=response.data;
      deferred.resolve(response);
    // console.log(getcommentData)
       ///$location.path("/");
      //console.log(response);
    },function errorCallback(response) {
          deferred.reject(response);
      console.log('error',response);
    });
  return deferred.promise;
},
editCommentitem:function(id){
    var deferred = $q.defer();
$http({
    method:"get",
    url:'api/edit/comment/'+id,
  }).then(function (response) {
      edititemdata=response.data;
      deferred.resolve(response);
    // console.log(getcommentData)
       ///$location.path("/");
      //console.log(response);
    },function errorCallback(response) {
          deferred.reject(response);
      console.log('error',response);
    });
    return deferred.promise;

},
saveandUpdateComment:function(id,comments){
  console.log(edititemdata);
    var deferred = $q.defer();
   $http({
    method:"put",
    url:'api/edit/comment/'+id,
    data:{comments:comments}
  }).then(function (response) {
      saveedititemdata=response.data;
      deferred.resolve(response);
    // console.log(getcommentData)
       ///$location.path("/");
      //console.log(response);
    },function errorCallback(response) {
          deferred.reject(response);
      console.log('error',response);
    });
    return deferred.promise;
},
remobveCommentItems:function(id){
     var deferred = $q.defer();
            $http({ 
               url: 'api/delete/comment/'+ id ,
                method: 'delete'
     }).then(function (response) {
     removeitem=response.data;
      deferred.resolve(response);
    },function errorCallback(response) {
          deferred.reject(response);
      console.log('error',response);
    });
    return deferred.promise;
},

likesComment:function(id){
      var deferred = $q.defer();
        $http({ 
          url: 'api/likes/comment/'+ id ,
          method: 'put'
     }).then(function (response) {
      likesCommentsItem=response.data;
      deferred.resolve(response);

    },function errorCallback(response) {
          deferred.reject(response);
      console.log('error',response);
    });
    return deferred.promise;
        
   },
dislikesComment: function(id){
   var deferred = $q.defer();
          $http({ 
          url: 'api/dislikes/comment/'+ id ,
         method: 'put'
     }).then(function (response) {
      dislikesCommetItem=response.data;
      deferred.resolve(response);

    },function errorCallback(response) {
          deferred.reject(response);
      console.log('error',response);
    });
    return deferred.promise;
        
      },

replyCommnetsOnClik:function(id){
    var deferred = $q.defer();
   $http({
    method:"get",
    url:'api/reply/comment/'+id,
  }).then(function (response) {
      replycommentdata=response.data;
      deferred.resolve(response);
    // console.log(getcommentData)
       ///$location.path("/");
      //console.log(response);
    },function errorCallback(response) {
          deferred.reject(response);
      console.log('error',response);
    });
    return deferred.promise;
        
      }
}

}])
