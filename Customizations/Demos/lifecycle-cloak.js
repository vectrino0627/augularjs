(function ( angular ) {
  var cityApp = angular.module( 'citiesApp', [] );

  cityApp.controller( 'CityListCtrl', ['$scope', '$http',
    function ( $scope, $http ) {
      // Set the debugger to stop right here
      $http( {
        url    : '../../data/cities.json',
        method : 'get'
      } )
        .then( function ( retObj ) {
          $scope.cities = retObj.data;
        } )

    }] );

})( angular );
