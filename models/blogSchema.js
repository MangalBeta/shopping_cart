var mongoose=require("mongoose");
var Schema= mongoose.Schema;
var commentSchema=require("./commentModel");
var BlogSchema = new Schema({
   title: {type:String},
   createdAt: { type: Date, default: Date.now },
   images:String,
   content:{type:String},
   tags: String
   //comments:[]

});
var Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;