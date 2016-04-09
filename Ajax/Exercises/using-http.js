(function ( angular ) {

  var teamApp = angular.module( 'teamApp', [] );

  // Build the controller to prevent problems with minification
  // And make sure to include both $scope, $log, and $http

  // Create a call to $http that grabs the URL ../../data/baseball-standings.json
  // via the get method. If it succeeds, assign the data to $scope.teams.
  // If it fails, print an error to the $log

})( angular );
