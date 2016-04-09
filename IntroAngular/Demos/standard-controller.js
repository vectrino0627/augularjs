(function ( angular ) {
  var mod = angular.module( 'firstApp', [] );

  mod.controller( 'FirstCtrl', function ( $scope ) {
    $scope.names = ['John', 'Dan', 'Tim', 'Andre', 'Angela',
      'Maria', 'Andres', 'Chuck', 'Joseph', 'Jose'];
  } );
})( angular );