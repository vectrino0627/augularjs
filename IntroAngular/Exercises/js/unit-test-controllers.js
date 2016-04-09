(function(angular) {
  var mod = angular.module( 'teamApp', [] );
  mod.controller( 'TeamCtrl', function ( $scope ) {
    $scope.teams = ['Mets', 'Yankees', 'Red Sox', 'Phillies', 'Blue Jays',
      'Braves', 'Orioles', 'Marlins', 'Rays', 'Nationals'];

    var droppedTeams = [];


    $scope.addTeam = function(newTeam) {
      if (newTeam && $scope.teams.indexOf(newTeam) === -1) {
        $scope.teams.push( newTeam );

        $scope.newTeam = '';
      }
    };

    $scope.delTeam = function(dropTeam) {
      if (dropTeam) {

        droppedTeams.push( dropTeam );
        $scope.teams.splice( $scope.teams.indexOf( dropTeam ), 1 );

      }

      $scope.dropTeam = '';
    };

    $scope.restoreTeams = function() {
      droppedTeams.forEach($scope.addTeam);
      droppedTeams = [];
    }
  } );
})(angular);