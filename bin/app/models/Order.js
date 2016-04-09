var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;
var fieldConfig = {
  "customerID" : String,
  "employeeID" : Number,
  "freight" : Number,
  "orderDate" : Date,
  "orderID" : Number,
  "requiredDate" : Date,
  "shipAddress" : String,
  "shipCity" : String,
  "shipCountry" : String,
  "shipName" : String,
  "shipPostalCode" : String,
  "shipVia" : Number,
  "shippedDate" : Date
};

var OrderSchema = new Schema( fieldConfig, {
  collection : 'orders'
} );

OrderSchema.statics.getFields = function() {
  if (! this.fields ) {
    return Object.keys( fieldConfig );
  } else {
    return this.fields;
  }
};

OrderSchema.statics.getType = function() {
  return 'Order';
};

module.exports = mongoose.model( 'Order', OrderSchema );

