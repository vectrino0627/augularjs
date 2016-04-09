var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;
var MovieSchema = new Schema( {


  "title"      : String,
  "year"       : String,
  "rated"      : String,
  "released"   : String,
  "runtime"    : String,
  "genre"      : Array,
  "director"   : String,
  "writer"     : Array,
  "actors"     : Array,
  "plot"       : String,
  "poster"     : String,
  "imdbRating" : String,
  "imdbVotes"  : String,
  "imdbID"     : String,
  "type"       : String,
  "business"   : String
}, {
  collection: 'top250'
} );

MovieSchema.statics.getFields = function() {
  if (! this.fields ) {
    return Object.keys( fieldConfig );
  } else {
    return this.fields;
  }
};

MovieSchema.statics.getType = function() {
  return 'Movie';
};

module.exports = mongoose.model( 'Movie', MovieSchema );
