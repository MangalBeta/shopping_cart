var mongoose=require("mongoose");
var Schema= mongoose.Schema;
var user=require("./userSchema");
var replyComment=require("./replySchema");
var CommentSchema = new Schema({
   name: String,
   email:String,
   comments:String,
   post_id:String,
   user_id: [],
   replyCommentUser:[],
   likes: {type: Number, default: 0 },
   dislikes: {type: Number, default: 0 },
   cretedByComm: { type: Date, default: Date.now }
});
var comment = mongoose.model('comment', CommentSchema);
//console.log(Blog)
module.exports = comment;