var filterApp = angular.module( 'filterApp', ['filterMod'] );

filterApp.controller( 'FilterCtrl', ['$scope', '$http', '$log',
  function ( $scope, $http, $log ) {

    $http( {
      url : '/data/baseball-standings.json',
      method : 'get'
    } )
      .success( function ( data ) {
        $log.debug( 'Retrieved baseball data!' );
        $scope.teams = data;
      } );

  }] );

