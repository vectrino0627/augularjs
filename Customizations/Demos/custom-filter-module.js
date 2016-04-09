(function ( angular ) {
  var filterApp = angular.module( 'filterApp', ['filterMod'] );

  filterApp.controller( 'FilterCtrl', ['$scope', '$http', '$log',
    function ( $scope, $http, $log ) {

      $http( {
        url    : '/data/baseball-standings.json',
        method : 'get'
      } )
        .then( function ( retObj ) {
          $log.debug( 'Retrieved baseball data!' );
          $scope.teams = retObj.data;
        } );

    }] );

})( angular );
