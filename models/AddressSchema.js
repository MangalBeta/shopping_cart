 var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
     var AddressSchema = new Schema({
      name: String,  
      address: String,
      city: String,
      state: String,
      zip: String
      },
      { _id: false });

  var Address= mongoose.model('Address', AddressSchema);
   
   module.exports=Address;



