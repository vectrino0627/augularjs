// Global so we can check it out at the console
var p           = null,
    customCache = null;

(function ( angular ) {
  var cityApp = angular.module( 'citiesApp', [] );

  cityApp.controller( 'CityListCtrl', ['$scope', '$http', '$cacheFactory', '$log',
    '$timeout',
    function ( $scope, $http, $cacheFactory, $log, $timeout ) {
      customCache = $cacheFactory.get( 'cityCache' );
      if ( !customCache ) {
        customCache = $cacheFactory( 'cityCache' );
      }

      $scope.invalidateCache = function () {
        customCache.removeAll();
      };

      // Uncomment this to have a cache which erases itself every 15 minutes
      //$timeout( customCache.removeAll, 15 * 60000 );

      $scope.getCities = function ( searchCity ) {
        p = $http( {
          url    : '/data/cities.json',
          method : 'get',
          cache  : customCache
        } )
          .then( function ( retObj ) {
            // This fires each time, but check Firefox + Firebug or the Network
            // tab in Chrome's developer tools. After the first time, subsequent
            // runs do not make actual Ajax requests
            $log.log( 'Success fired!' );
            $log.log( 'Status: ' + retObj.status );
            $scope.cities = retObj.data;
            $scope.filterVal = {};
            $scope.filterVal.name = searchCity;
          },
          function ( err ) {
            $log.error( 'Error fired!' );
            $log.log( err.data ); // Response content
            $log.log( 'Status: ' + err.status );  // Only appears with an actual error
          } );
      }
    }] );

})( angular );
