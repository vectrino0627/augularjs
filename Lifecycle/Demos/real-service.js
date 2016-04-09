(function ( angular ) {
  var cityApp = angular.module( 'citiesApp', ['dataAccess'] );

  cityApp.controller( 'CityListCtrl', ['$scope', 'cityFinder',
    function ( $scope, cityFinder ) {

      $scope.getCities = function () {
        $scope.cities = cityFinder.getCities( { name : $scope.filterCity } );
      }
    }] );

})( angular );
