(function ( angular ) {
  var cityApp = angular.module( 'citiesApp', [] );

// Global so we can check it out at the console
  var p = null;

  cityApp.controller( 'CityListCtrl', ['$scope', '$http', '$log',
    function ( $scope, $http, $log ) {
      p = $http( {
        url : '/data/cities.json',

        // Uncomment this to test bad data
        //url : '/data/cities-bad.json',

        // Uncomment this to test a 404
        //url : '/data/no-cities.json',

        method : 'get',
        params : {
          cb : (new Date()).getTime()
        }

        // If you uncomment this, and use bad data, above,
        // there will be no error whatsoever!
        //, responseType: 'json'
      } );
      p.then( function ( retObj ) {
        $log.log( 'Success fired!' );
        $log.log( 'Status: ' + retObj.status );
        $scope.cities = retObj.data;
      } );
      p.catch( function ( err ) {
        // What kind of error are we dealing with?
        // Timeouts give a status of 0
        if ( err.status === 0 ) {
          $log.error( 'Error: looks like a timeout' );
        } else if ( err.status === undefined ) {
          // Undefined status could be a parsing error
          $log.error( 'Might be a parse or other type of non-HTTP error' );
        }

        $log.log( 'Error data: ', data );
        $log.log( 'Error status: ', status );
      } );

    }] );

})( angular );
