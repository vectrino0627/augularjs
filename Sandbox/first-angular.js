/**
 * Created by Administrator on 12/14/2015.
 */


//keep things local.

(function(angular) {
    var mod = angular.module('firstApp', []);

    mod.controller('MainCtrl', function ($scope, $http) {
        $scope.greeting = "Halo";

        //$scope.teams = ['Giants','Cowboys','Eagles','Redskins'];
        //$scope.filterTeams = 'a';

        $http.get('/data/baseball-standings.json').then(function (retObj ){
            $scope.teams = retObj.data;
        })

    });


    mod.filter('cityTeamFilter',function()
    {
        return function (input, searchString){
            if ( !searchString){
                return input ;
            }
            var output = [];
            input.forEach(function(team){
                if (team.city.toUpperCase().indexOf(searchString.toUpperCase())>-1 ||
                    team.team.toUpperCase().indexOf(searchString.toUpperCase())>-1)
                {output.push(team)}
            })

        }
    });

})(angular);
