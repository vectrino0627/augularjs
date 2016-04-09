var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;
var fieldConfig = {
  "categoryID" : {type: Number, required: false},
  "categoryName" : String,
  "description" : String
};

var CategorySchema = new Schema( fieldConfig, {
  collection : 'categories'
} );

CategorySchema.statics.getFields = function() {
  if (! this.fields ) {
    return Object.keys( fieldConfig );
  } else {
    return this.fields;
  }
};

CategorySchema.statics.getType = function() {
  return 'Category';
};

module.exports = mongoose.model( 'Category', CategorySchema );
