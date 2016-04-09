var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;
var fieldConfig = {
  "address" : String,
  "city" : String,
  "companyName" : String,
  "contactName" : String,
  "contactTitle" : String,
  "country" : String,
  "phone" : String,
  "postalCode" : String,
  "supplierID" : Number
};

var SupplierSchema = new Schema( fieldConfig, {
  collection : 'suppliers'
} );

SupplierSchema.statics.getFields = function() {
  if (! this.fields ) {
    return Object.keys( fieldConfig );
  } else {
    return this.fields;
  }
};

SupplierSchema.statics.getType = function() {
  return 'Supplier';
};

module.exports = mongoose.model( 'Supplier', SupplierSchema );

