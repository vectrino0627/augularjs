var express = require( 'express' ),
  Doughnut = require( '../models/Doughnut' ),
  DoughnutConfig = require( '../models/DoughnutConfig' ),
  _ = require( 'underscore' );

var router = express.Router();

function safeSet( model, obj, sFields ) {
  sFields.forEach( function ( field ) {
    if ( obj[field] ) {
      model[field] = obj[field];
    }
  } )
}

function checkQuery(query) {
  if (query.emptyAllowed) {
    return query;
  }

  var keys = Object.keys( query );
  var dupe = _.clone( query );

  keys.forEach(function(key) {
    if (!dupe[key]) {
      delete dupe[key];
    }

  });

  return dupe;
}


router.route( '/' )
  .get( function ( req, res ) {
    if ( req.query.name ) {
      req.query.name = new RegExp( req.query.name, 'i' );
    }
    Doughnut.find( req.query, function ( err, doughnuts ) {
      if ( err ) {
        res.send( err );
      }
      res.json( doughnuts );
    } );
  } )
  .post(function(req, res) {
    var emp = new Doughnut(); 		// create a new instance of the Employee model
    safeSet( emp, req.body, Doughnut.getFields() );

    // save the Employee and check for errors
    emp.save( function ( err ) {
      if ( err ) {
        res.json( err );
        res.end();
      } else {
        res.json( {message : 'Doughnut created!'} );
      }
    } );

  });

router.route( '/f/*' )
  .get( function ( req, res ) {
    var fieldsArray = req.params[0].split( '/' ),
      fields = fieldsArray.join( ' ' );
    Doughnut.find( req.query, fields, function ( err, doughnuts ) {
      if ( err ) {
        res.send( err );
      }

      if ( fieldsArray.length > 1 ) {
        res.json( doughnuts );
      } else {
        res.json( _.pluck( doughnuts, fields ) );
      }
    } );

  } );


router.route( '/config' )
  .get( function ( req, res ) {
    DoughnutConfig.find( req.query, function ( err, configs ) {
      if ( err ) {
        res.send( err );
      }

      res.json( configs );
    } )
  } );

router.route( '/config/:property' )
  .get( function ( req, res ) {
    DoughnutConfig.findOne( {'property' : req.params.property}, function ( err, config ) {
      if ( err ) {
        res.send( err );
      }

      res.json( config );
    } )
  } )
  .put(function(req, res) {
    DoughnutConfig.findOne( {'property' : req.params.property}, function ( err, record ) {
      if ( err ) {
        res.send( err );
        res.end();
      } else {
        safeSet( record, req.body, DoughnutConfig.getFields() );
        console.log( 'record: ', record );
        console.log( 'req.body: ', req.body );
        record.save( function ( err ) {
          if ( err ) {
            res.send( err );
          }
          res.json( {message : 'Doughnut Config property ' + record.property + ' updated'} )
        } )
      }
    } )
  });

router.route( '/:doughnutID' )
  .get( function ( req, res ) {
    Doughnut.findOne( {'doughnutID' : req.params.doughnutID}, function ( err, doughnut ) {
      console.log( 'Looking for %s', req.params.doughnutID );

      if ( err ) {
        res.send( err );
      }
      res.json( doughnut );

    } )
  } )
  .put(function(req, res) {
    Doughnut.findOne( {doughnutID : req.params.id}, function ( err, d ) {
      if ( err ) {
        res.send( err );
        res.end();
      } else {
        safeSet( d, req.body, Doughnut.getFields() );
        d.save( function ( err ) {
          if ( err ) {
            res.send( err );
          }
          res.json( {message : 'Doughnut #' + d.doughnutID + ' updated'} )
        } )
      }
    } )

  });


module.exports = router;
