var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;
var fieldConfig = {
  "doughnutID" : {type : Number, required : true},
  "name"       : {type : String, required : true},
  "base"       : {type : String, required : true},
  "icing"      : String,
  "filling"    : String,
  "topping"    : String
};

var DoughnutSchema = new Schema( fieldConfig, {
  collection : 'doughnuts'
} );

DoughnutSchema.statics.getFields = function () {
  if ( !this.fields ) {
    return Object.keys( fieldConfig );
  } else {
    return this.fields;
  }
};

DoughnutSchema.statics.getType = function() {
  return 'Doughnut';
};

module.exports = mongoose.model( 'Doughnut', DoughnutSchema );

