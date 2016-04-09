var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;
var StateNameSchema = new Schema( {
  "name"             : String,
  "abbreviation"     : String,
  "_id"              : String
}, {
  collection : 'stateNames'
} );

module.exports = mongoose.model( 'StateName', StateNameSchema );
