(function ( angular ) {
  var cityApp = angular.module( 'citiesApp', [] );

  cityApp.controller( 'CityListCtrl', ['$scope', '$http', '$log',
    function ( $scope, $http, $log ) {
      $http.get( '/data/cities.json' )
        .then( function ( retObj ) {
          $scope.cities = retObj.data;
        }, function ( err ) {
          $log.error( 'Error data: ', err.data );
          $log.log( 'Error status: ', err.status );
        } );

    }] );

})( angular );
