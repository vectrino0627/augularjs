var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;
var fieldConfig = {
  "firstName"         : {type: String, required: true },
  "lastName"          : {type: String, required: true },
  "employeeID"        : {type: Number, required: true },
  "address"         : String,
  "birthDate"       : Date,
  "city"            : String,
  "country"         : String,
  "extension"       : String,
  "hireDate"        : Date,
  "homePhone"       : String,
  "notes"           : String,
  "photoPath"       : String,
  "postalCode"      : String,
  "region"          : String,
  "reportsTo"       : Number,
  "title"           : String,
  "titleOfCourtesy" : String
};

var EmployeeSchema = new Schema( fieldConfig, {
  collection: 'employees'
} );

EmployeeSchema.statics.getFields = function() {
  if (! this.fields ) {
    return Object.keys( fieldConfig );
  } else {
    return this.fields;
  }
};

EmployeeSchema.statics.getType = function() {
  return 'Employee';
};

module.exports = mongoose.model( 'Employee', EmployeeSchema );
