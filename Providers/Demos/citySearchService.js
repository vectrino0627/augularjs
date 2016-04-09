(function ( angular ) {
  angular.module( 'dataAccess', [] )

    .service( 'cityFinder', ['$http', '$log', 'filterFilter',
      function ( $http, $log, filterFilter ) {
        var retData = {};

        // Get the data
        var p = $http( {
          url    : '/data/cities.json',
          method : 'get'
        } );

        p.then( function ( retObj ) {
          $log.log( 'Successfully accessed data for cities.' );
          retData.cities = retObj.data;
        } );
        p.catch( function ( err ) {
          $log.error( 'Could not access city data...' );
          $log.log( err.data ); // Response content
          $log.log( 'Status: ' + err.status );  // Only appears with an actual error
        } );


        this.getCities = function ( filterVal ) {
          return filterFilter( retData.cities, filterVal );
        }
      }] );

})( angular );
