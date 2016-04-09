var config = require('./config'),
  express = require( 'express' ),
  bodyParser = require( 'body-parser' ),
  morgan = require( 'morgan' ),
  nwr = require( './routers/northwind-routes' ),
  movieRouter = require( './routers/movie-routes' ),
  stateRouter = require( './routers/state-routes' ),
  doughnutRouter = require( './routers/doughnut-routes' ),
  mongoose = require( 'mongoose' );


console.log( config );
mongoose.connect( config.classDB.url ,
  {
    user : config.classDB.user,
    pass : config.classDB.pass
  } );

var app = express();
app.use( morgan( 'dev' ) );

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use( bodyParser.urlencoded( {extended : true} ) );
app.use( bodyParser.json() );

app.set( 'json spaces', 4 );

var port = process.env.PORT || 8001; 		// set our port

var router = express.Router();

// middleware to use for all requests
app.use( function ( req, res, next ) {
  res.header( "Access-Control-Allow-Origin", config.localhost.url );
  res.header( "Access-Control-Allow-Methods", "POST,PUT" );
  res.header( "Access-Control-Allow-Headers", "X-Requested-With, Content-Type" );
  res.header( 'Access-Control-Expose-Headers', 'Accept-Ranges, Content-Encoding, Content-Length, Content-Range, X-Content-Range' );
  res.header( "Content-Type", "application/json" );
  next();
} );

// test route to make sure everything is working
// (accessed at GET http://localhost:8001/api)
router.get( '/', function ( req, res ) {
  res.json( {message : 'Speeding Planet class database RESTful interface is operational.'} );
} );

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
app.use( '/api', router );
app.use( '/northwind', nwr );
app.use( '/movies', movieRouter );
app.use( '/states', stateRouter );
app.use( '/doughnutShoppe', doughnutRouter );

// START THE SERVER
// =============================================================================
app.listen( port );
console.log( 'Magic happens on port ' + port );
