var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;
var fieldConfig = {
  "property" : {type : String, required : true},
  "values"       : {type : Array, required : true}
};

var DoughnutConfigSchema = new Schema( fieldConfig, {
  collection : 'doughnutConfig'
} );

DoughnutConfigSchema.statics.getFields = function () {
  if ( !this.fields ) {
    return Object.keys( fieldConfig );
  } else {
    return this.fields;
  }
};

DoughnutConfigSchema.statics.getType = function() {
  return 'DoughnutConfig';
};

module.exports = mongoose.model( 'DoughnutConfig', DoughnutConfigSchema );

