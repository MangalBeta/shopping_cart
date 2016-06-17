var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
		local: {
  username: {type: String, required: true, unique: true },
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  pic:String,
  gender:String,
  authToken: { type: String, required:true, unique:true },
  isAuthenticated: { type: Boolean, required:true }
}
});
var user = mongoose.model('user', userSchema);
module.exports = user;
