(function ( angular ) {
  var cityApp = angular.module( 'citiesApp', ['dataAccess'] );

  cityApp.controller( 'CityListCtrl', ['$scope', 'cityFinder',
    function ( $scope, cityFinder ) {

      $scope.getCities = function ( cityName ) {
        $scope.cities = cityFinder( { name : cityName } );
      }
    }] );

})( angular );
