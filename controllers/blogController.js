var blogModel = require('../models/blogSchema');
var commentModel = require('../models/commentModel');
var userModel = require('../models/userSchema');
var replyModel = require('../models/replySchema');
module.exports.addBlog=function(req,res){
var blog=new blogModel();
blog.title=req.body.title;
blog.content=req.body.content;
blog.tags=req.body.tags;
console.log(req.body.tags);
blog.images=req.file.filename;
blog.email=req.body.email;
blog.createdby= req.body.createdby;
blog.name= req.body.name;
blog.price= req.body.price;
var uid=req.params.id;
//console.log(uid);
blog.save(function(err,blog){
	if(err){
		console.log('err',err)
	}else{
		//console.log(blog);
		res.send(blog);
		//res.redirect("/list")
	}

})
}
//comment******************_______________________________
module.exports.addComment=function(req,res){
var userId=req.body.user_id
var comment=new commentModel();
comment.name= req.body.name;
comment.email= req.body.email;
comment.comments= req.body.comments;
comment.post_id= req.body.post_id;
comment.user_id=userId;
//comment.replyCommentUser=req.body.replyComm;
comment.save(function(err,comment){
  if(err){
    console.log('err',err)
  }else{
   // console.log(comment);
    res.send(comment);
    //res.redirect("/list")
  }

})
}

module.exports.replyaddComment=function(req,res){
console.log(req.body.comment_id);
var repcomment =replyModel();
repcomment.user_id=req.body.user_id;
repcomment.comment_id=req.body.comment_id;
repcomment.replyComment=req.body.replyComment;
repcomment.save(function(err,reply){
  if(err){
    res.send(err)
  }else{
//console.log("cooo" + req.body.comment_id);
 commentModel.findOneAndUpdate({_id:req.body.comment_id}, {$push:{replyCommentUser:reply.toObject()}})
         .exec(function(err, comment){
         if (err){
              res.json(err);
                   } else {
          console.log(reply)
                       }
          })
           res.send(reply);
  }
})
}
module.exports.removeComment=function (req, res){
  //console.log(req.params.id);
  commentModel.findById(req.params.id, function (err, comment ){
    comment.remove(function (err, comment ){
      //res.redirect( '/list' );
      res.send(comment)
      console.log("delete");
    });
  });
}
module.exports.likesComment=function (req, res){
  commentModel.findById(req.params.id, function (err, comment ){
   comment.likes +=1;
     comment.save(function (err, comment ){
      res.send(comment)
      console.log(comment);
    });
  });
}
module.exports.dislikesComment=function (req, res){
  commentModel.findById(req.params.id, function (err, comment ){
   comment.dislikes +=1;
     comment.save(function (err, comment ){
      res.send(comment)
      console.log(comment);
    });
  });
}
module.exports.viewComments = function(req,res){
  console.log(req.params.id)
   commentModel.find({post_id:req.params.id},function(err, comment){
    if(err){
    res.send(err);
  }else{
    console.log(comment)
      res.send(comment)
      //res.redirect("/list")
    }
});
}
module.exports.viewreplyComments = function(req,res){
  console.log("coomentId" + req.params.id)
    replyModel.find({comment_id:req.params.id},function(err, replycomment){
    if(err){
    res.send(err);
  }else{
    //console.log(replycomment)
      res.send(replycomment)
      //res.redirect("/list")
    }
});
// replyModel.find({
//         comment_id : req.params.id
//       })
//      .populate('replyCommentUser')
//      .exec(function(err, comment){
//       res.send(comment);
//           console.log(comment);
//      })
}
module.exports.editComment=function (req, res ){
  commentModel.findById(req.params.id, function ( err, comment ){
    if(err){
        res.json(err);
      }else{
        res.send(comment);
//req.session.user=person;
     // res.redirect( '/');
  }
    });
  }

module.exports.saveEditComment=function (req, res ){
  //console.log(req.body);
  commentModel.findById(req.params.id, function ( err, comment ){
  comment.comments =req.body.comments;
    //blog.images  = req.file.filename;
  comment.save( function ( err, blog ){
      if(err){
        res.json(err);
      }else{
    // req.session.user=person;
      //res.redirect( '/list');
      res.send(comment)
  }
    });
  });
}
module.exports.replyComment=function (req, res ){
  commentModel.findById(req.params.id, function ( err, comment ){
    if(err){
        res.json(err);
      }else{
        res.send(comment);
//req.session.user=person;
     // res.redirect( '/');
  }
    });
  }
////comment____________________________________________________________

module.exports.viewsigleBlog = function(req,res){
	 blogModel.find({email:req.params.email},function(err,blog){
		if(err){
		res.send(err);
	}else{
			res.send(blog)
			//res.redirect("/list")
		}
	 });
}


module.exports.viewALLBlog = function(req,res){
   blogModel.find({},function(err,blog){
    if(err){
    res.send(err);
  }else{
      res.send(blog)
     // console.log(blog);
      //res.redirect("/list")
    }
   });
}

module.exports.removeData=function (req, res){
	console.log(req.params.id);
  blogModel.findById(req.params.id, function ( err, blog ){
    blog.remove(function (err, blog ){
      //res.redirect( '/list' );
      res.send(blog)
      console.log("delete");
    });
  });
}

// module.exports.editBlog=function(req,res,next){
// 	blogModel.findById(req.params.id,function(err,blog){
// 		if(err){
// 			res.send(err);
// 		}
// 		else{
// 			//req.session.user=person;
// 			res.send(blog);
// 			//res.render('singel-blogview');
// 		}
// 	})
// }
//******************addcart get data
module.exports.addcart=function (req, res ){
  blogModel.findById(req.params.id, function ( err, blog ){
    if(err){
        res.json(err);
      }else{
        res.send(blog);
//req.session.user=person;
     // res.redirect( '/');
  }
    });
  }

//****edit the the data;
module.exports.editBlog=function (req, res ){
	blogModel.findById(req.params.id, function ( err, blog ){
  	if(err){
    		res.json(err);
    	}else{
        res.send(blog);
//req.session.user=person;
     // res.redirect( '/');
  }
    });
  }

module.exports.saveEditBlog=function (req, res ){
  console.log(req.body);
  blogModel.findById(req.params.id, function ( err, blog ){
    blog.title =req.body.title;
    blog.content  = req.body.content;
    blog.tags  = req.body.tags;
    //blog.images  = req.file.filename;
    blog.save( function ( err, blog ){
      if(err){
        res.json(err);
      }else{
    // req.session.user=person;
      //res.redirect( '/list');
      res.send(blog)
  }
    });
  });
}