var express     = require( 'express' ),
    serveIndex  = require( 'serve-index' ),
    serveStatic = require( 'serve-static' ),
    bodyParser  = require( 'body-parser' ),
    morgan      = require( 'morgan' );

var docRoot = process.env.ANGULAR_HOME || '.';
var app = express();

// Logging
app.use( morgan( 'dev' ) );

// Request body parsing, only handles x-www-form-urlencoded
app.use( bodyParser.urlencoded( { extended : false } ) );

// including parsing application/json
app.use( bodyParser.json() );

app.get( '/app/reqAsJson', function ( req, res ) {
  res.setHeader( 'Content-Type', 'application/json' );
  res.write( JSON.stringify( req.query ) );
  res.end();
} );

app.post( '/app/reqAsJson', function ( req, res ) {
  res.setHeader( 'Content-Type', 'application/json' );
  res.write( JSON.stringify( req.body ) );
  res.end();
} );

// ###### Content below here processes everything else, in sequence! ######
/*
 * Handle files directly
 * THIS MUST COME FIRST
 * (otherwise, /Foo/Bar does not go to /Foo/Bar/index.html automatically)
 */
app.use( '/', serveStatic( docRoot ) );

// Handles PushStateRouting by ignoring everything after /Routing/Demos/PushStateRouting/
app.use('/Routing/Demos/PushStateRouting/*', serveStatic(docRoot + '/Routing/Demos/PushStateRouting/index.html'));

// Nice directories
app.use( '/', serveIndex( docRoot, { 'icons' : true, 'view' : 'details' } ) );

var server = app.listen( 8000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log( 'AngularClass web server running on %s:%d', host, port );
} );

