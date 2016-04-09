(function ( angular ) {
  // Define an application, consider calling it 'teamApp'
  var teamApp = angular.module( 'teamApp', [] );

  // Define a controller, consider calling it TeamCtrl
  // Move the definition of teams to this controller, and assign it
  // to $scope so it is visible throughout the page
  teamApp.controller( 'TeamCtrl', function ( $scope, $log ) {
    $log.log( 'TeamCtrl initialized.' );
    $scope.teams = ['Mets', 'Yankees', 'Red Sox', 'Phillies', 'Blue Jays', 'Braves', 'Orioles',
      'Marlins', 'Rays', 'Nationals'];
  } );

})( angular );
