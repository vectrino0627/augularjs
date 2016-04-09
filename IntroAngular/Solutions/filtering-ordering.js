(function ( angular ) {
  var mod = angular.module( 'teamApp', ['baseballAccess'] );
  mod.controller( 'TeamCtrl', function ( $scope, baseballDAO ) {
    $scope.teams = baseballDAO.getData();
  } );
})( angular );

