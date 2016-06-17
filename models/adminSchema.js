var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var adminSchema = new Schema({
  username: { type : String, unique:true},
  password: String

});
var dashboard = mongoose.model('dashboard', adminSchema);

module.exports = dashboard;
