(function ( angular ) {
  var teamApp = angular.module( 'teamApp', [] );

  /*
   * Update the controller to put almost everything on the controller object
   * You can generally switch out "$scope" for "this"
   *
   * Additionally, if you want to see the controller work as-is, uncomment
   * the reference to $scope on the next line
   */
  teamApp.controller( 'TeamCtrl', ['$scope', function ( /*$scope*/ ) {
    $scope.teams = ['Mets', 'Yankees', 'Red Sox', 'Phillies', 'Blue Jays', 'Braves', 'Orioles',
      'Marlins', 'Rays', 'Nationals'];

    $scope.droppedTeams = [];

    $scope.addTeam = function ( newTeam ) {
      if ( newTeam && $scope.teams.indexOf( newTeam ) === -1 ) {
        $scope.teams.push( newTeam );
        $scope.newTeam = '';
      }
    };

    $scope.delTeam = function ( dropTeam ) {
      if ( dropTeam && $scope.teams.indexOf( dropTeam ) > -1 ) {
        $scope.droppedTeams.push( dropTeam );
        $scope.teams.splice( $scope.teams.indexOf( dropTeam ), 1 );
      }
    };

    $scope.restoreTeams = function () {
      $scope.droppedTeams.forEach( $scope.addTeam );
      $scope.droppedTeams = [];
    }

  }] );

})( angular );
