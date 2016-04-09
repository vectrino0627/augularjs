var express = require( 'express' ),
  Movie = require( '../models/Movie' ),
  _ = require( 'underscore' );

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

function genericPost( req, res, ObjType ) {
  var instance = new ObjType();
  safeSet( instance, req.body, ObjType.getFields() );

  instance.save( function ( err ) {
    if ( err ) {
      res.json( err );
      res.end();
    } else {

      res.json( { message : ObjType.getType() + ' created!' } );
    }
  } )
}

function genericPut( req, res, pkField, ObjType ) {
  var searchConfig = {};
  searchConfig[pkField] = req.params.id;

  ObjType.findOne( searchConfig,
    function ( err, instance ) {
      if ( err ) {
        res.send( err );
        res.end();
      } else {
        safeSet( instance, req.body, ObjType.getFields() );
        instance.save( function ( err ) {
          if ( err ) {
            res.send( err );
          }
          res.json( { message : ObjType.getType() + ' #' + instance[pkField] + ' updated' } )
        } )
      }
    } )
}

var router = express.Router();

router.route( '/' )
  .get( function ( req, res ) {
    if ( req.query.title ) {
      req.query.title = new RegExp( req.query.title );
    }

    var query = checkQuery( req.query );
    Movie.find( query, function ( err, movies ) {
      if ( err ) {
        res.send( err );
      }
      res.json( movies );
    } );
  } );

router.route( '/f/*' )
  .get( function ( req, res ) {
    var fieldsArray = req.params[0].split( '/' ),
      fields = fieldsArray.join( ' ' );
    Movie.find( req.query, fields, function ( err, emps ) {
      if ( err ) {
        res.send( err );
      }

      if ( fieldsArray.length > 1 ) {
        res.json( emps );
      } else {
        res.json( _.pluck( emps, fields ) );
      }
    } );

  } )
  .post( function ( req, res ) {
    genericPost( req, res, Movie );
  } );


router.route( '/:imdbID' )
  .put( function ( req, res ) {
    genericPut( req, res, 'imdbID', Movie );
  } )  .get( function ( req, res ) {
    Movie.findOne( {'imdbID' : req.params.imdbID}, function ( err, mov ) {
      console.log( 'Looking for %s', req.params.imdbID );

      if ( err ) {
        res.send( err );
      }
      res.json( mov );

    } )
  } );

module.exports = router;