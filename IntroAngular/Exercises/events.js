(function(angular) {
  var mod = angular.module( 'teamApp', [] );
  mod.controller( 'TeamCtrl', function ( $scope, filterFilter ) {
    $scope.teams = ['Mets', 'Yankees', 'Red Sox', 'Phillies', 'Blue Jays',
      'Braves', 'Orioles', 'Marlins', 'Rays', 'Nationals'];

    // Challenge: Restore the dropped teams.
    // You'll need an array to track the dropped teams
    // And you'll need to modify delTeam, below, to "remember" the dropped team(s)


    // Add a function, addTeam to add a new team to $scope.teams. Don't forget to
    // verify that there is a team to add, and that it's not a duplicate!

    $scope.addTeam = function(newTeam){
      var results = [];
      results = filterFilter( $scope.teams, newTeam );
      if ( (newTeam.length>=1 ) && ( results.length === 0 ))
      {
        $scope.teams.push(newTeam);
        //$scope.$apply();
      }
    };
    var dlist = [];

    $scope.RemoveTM = function(selectName){
      var results = [];
      results = filterFilter( $scope.teams, selectName );
      if ( (selectName.length>=1 ) && ( results.length != 0 ))
      {
        var adelTeam;
        adelTeam = $scope.teams.splice($scope.teams.indexOf( selectName),1);
        $scope.selectName="";
        dlist.push(adelTeam);

        //$scope.$apply();
      }
    };


    $scope.RestoreTM = function(){
      var results = [];

    };

    // Add a function, delTeam to delete a team from $scope.teams. As above, check
    // to make sure a team to drop was passed in.

    // Challenge: Restore the dropped teams

  } );
})(angular);