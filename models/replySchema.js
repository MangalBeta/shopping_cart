var mongoose=require("mongoose");
var Schema= mongoose.Schema;
var user=require("./userSchema");
var replyCommentSchema = new Schema({
   user_id:[],
   replyComment:String,
   comment_id:String,
   cretedByComm: { type: Date, default: Date.now }
});
var replyComment = mongoose.model('replyComment', replyCommentSchema);
//console.log(Blog)
module.exports = replyComment;