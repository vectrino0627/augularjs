var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;
var StateSchema = new Schema( {
  "name"             : String,
  "abbreviation"     : String,
  "_id"              : String,
  "capital"          : String,
  "mostPopulousCity" : String,
  "population"       : Number,
  "squareMiles"      : Number,
  "timeZone1"        : String,
  "timeZone2"        : String,
  "dst"              : String
}, {
  collection : 'states'
} );

module.exports = mongoose.model( 'State', StateSchema );
