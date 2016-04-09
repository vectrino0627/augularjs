(function ( angular ) {
  var teamApp = angular.module( 'teamApp', [] );

  teamApp.controller( 'TeamCtrl', function ( $scope ) {
    $scope.teams = ['Mets', 'Yankees', 'Red Sox', 'Phillies', 'Blue Jays', 'Braves', 'Orioles',
      'Marlins', 'Rays', 'Nationals'];

    // Challenge: Restore the dropped teams.
    // You'll need an array to track the dropped teams
    // And you'll need to modify delTeam, below, to "remember" the dropped team(s)

    // Add a function, addTeam to add a new team to $scope.teams. Don't forget to
    // verify that there is a team to add, and that it's not a duplicate!

    // Add a function, delTeam to delete a team from $scope.teams. As above, check
    // to make sure a team to drop was passed in.

    // Challenge: Restore the dropped teams

  } );

})( angular );
