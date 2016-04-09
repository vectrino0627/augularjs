(function ( angular ) {
  var filterApp = angular.module( 'filterApp', [] );

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

      $scope.winningTeams = function ( team ) {
        var pct = Number( team.win_percentage );
        return pct >= (Number( $scope.customWin ) || 0.501);
      };
    }] );

})( angular );
