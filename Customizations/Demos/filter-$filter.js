(function ( angular ) {
  var teamApp = angular.module( 'teamApp', [] );

  teamApp.controller( 'TeamCtrl', ['$scope', '$http', '$log', '$filter',
    function ( $scope, $http, $log, $filter ) {

      var p = $http( {
        url    : '/data/baseball-standings.json',
        method : 'get'
      } )
        .then( function ( retObj ) {
          $scope.teams = retObj.data;
          $scope.teams.forEach( function ( team ) {
            team.win_percentage = $filter( 'number' )( team.win_percentage, 2 );
          } )
        },
        function ( err ) {
          $log.error( err );
        } )

    }] );

})( angular );
