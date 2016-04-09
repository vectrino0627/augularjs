(function(angular) {
  var mod = angular.module( 'filterApp', [] );
  mod.controller( 'FilterCtrl', function ( $scope ) {
    $scope.names = ['John', 'Dan', 'Tim', 'Andre', 'Angela',
      'Maria', 'Andres', 'Chuck', 'Joseph', 'Jose'];

  } )
})(angular);