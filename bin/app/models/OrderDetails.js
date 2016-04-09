var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;
var fieldConfig = {
  "quantity": Number,
  "productID": Number,
  "discount": Number,
  "unitPrice": Number,
  "orderID": Number
};

var orderDetailsSchema = new Schema( fieldConfig, {
  collection : 'order_details'
} );

orderDetailsSchema.statics.getFields = function() {
  if (! this.fields ) {
    return Object.keys( fieldConfig );
  } else {
    return this.fields;
  }
};

orderDetailsSchema.statics.getType = function() {
  return 'OrderDetails';
};

module.exports = mongoose.model( 'orderDetails', orderDetailsSchema );


