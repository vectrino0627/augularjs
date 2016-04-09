(function ( angular ) {

  var teamApp = angular.module( 'teamApp', [] );

  // Build the controller to prevent problems with minification
  // And make sure to include $scope, $log, and $http
  teamApp.controller( 'TeamCtrl', ['$scope', '$http', '$log',
    function ( $scope, $http, $log ) {

      // Create a call to $http that grabs the URL ../../data/baseball-standings.json
      // via the get method. If it succeeds, assign the data to $scope.teams.
      // If it fails, print an error to the $log
      var p = $http( {
        url    : '../../data/baseball-standings.json',
        method : 'get'
      } );

      p.then( function ( retObj ) {
        $scope.teams = retObj.data
      } );

      p.catch( function ( err ) {
        $log.error( err );
      } );

    }] );
})( angular );
