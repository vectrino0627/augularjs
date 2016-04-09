var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;
var fieldConfig = {
  "categoryID" : {type: Number, required: false},
  "discontinued" : Boolean,
  "productID" : {type: Number, required: true},
  "productName" : {type: String, required: true},
  "quantityPerUnit" : String,
  "reorderLevel" : Number,
  "supplierID" : Number,
  "unitPrice" : Number,
  "unitsInStock" : Number,
  "unitsOnOrder" : Number
};

var ProductSchema = new Schema( fieldConfig, {
  collection : 'products'
} );

ProductSchema.statics.getFields = function() {
  if (! this.fields ) {
    return Object.keys( fieldConfig );
  } else {
    return this.fields;
  }
};

ProductSchema.statics.getType = function() {
  return 'Product';
};

module.exports = mongoose.model( 'Product', ProductSchema );
