angular.module( 'dataAccess', [] )

  .factory( 'cityFinder', ['$http', '$log', 'filterFilter',
    function ( $http, $log, filterFilter ) {
      var retData = {};

      // Get the data
      var p = $http( {
        url : '/data/cities.json',
        method : 'get'
      } );

      p.success( function ( data ) {
        $log.log( 'Successfully accessed data for cities.' );
        retData.cities = data;
      } );
      p.error( function ( data, status ) {
        $log.error( 'Could not access city data...' );
        $log.log( data ); // Response content
        $log.log( 'Status: ' + status );  // Only appears with an actual error
      } );

      return function ( filterVal ) {
        return filterFilter( retData.cities, filterVal );
      }
    }] );
