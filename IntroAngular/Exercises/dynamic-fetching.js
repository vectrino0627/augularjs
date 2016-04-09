(function(angular) {
  var mod = angular.module( 'teamApp', [] );
  // Add a dependency on $http to the TeamCtrl controller
  mod.controller( 'TeamCtrl', function ( $scope ) {

    /*
     * Make a call to $http, using the 'get' method and setting the url
     * value to ../../data/baseball-standings.json
     * When the call succeeds, get the data, iterate over it and pluck
     * out the team names (hint: the property is "team") and build an array
     * of only those team names. Then make the array available on $scope
     * as $scope.teams
     */


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