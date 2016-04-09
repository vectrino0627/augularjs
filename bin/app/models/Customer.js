var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;
var fieldConfig =  {
  "contactTitle" : String,
  "fax"          : String,
  "companyName"  : {type: String, required: true },
  "contactName"  : {type: String, required: true },
  "postalCode"   : String,
  "region"       : String,
  "city"         : String,
  "customerID"   : {type: String, required: true },
  "address"      : String,
  "phone"        : String,
  "country"      : String
};
var CustomerSchema = new Schema(fieldConfig, {
  collection : 'customers'
} );

CustomerSchema.statics.getFields = function() {
  if (! this.fields ) {
    return Object.keys( fieldConfig );
  } else {
    return this.fields;
  }
};

CustomerSchema.statics.getType = function() {
  return 'Customer';
};

module.exports = mongoose.model( 'Customer', CustomerSchema );
