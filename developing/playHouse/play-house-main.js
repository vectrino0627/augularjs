/**
 * Created by nuo134 on 1/5/2016.
 */



(function(angular){
    var app = angular.module("playHouse", ['ui.router'] );



    app.controller("MainCtrl",["$scope", "$http", "$filter","$log", function($scope,$http,$filter, $log){
        //$http.get().then();

        $http.get('/data/xaa-dept2.json')
            .then(function(retObj2) {


                $log.log("loading dept info from step1!");
                dplist = retObj2.data;



                var app = 'AirFare';
                var d1 = new Date();
                var d2 = new Date();

                $log.log("Writing Json File");

            });

        alert("finished?");


    }]);

    app.controller("autoCtrl",["$scope", "$http", "$filter","$log", function($scope,$http,$filter, $log){
        //$http.get().then();
        $scope.usStates = [];


        $http.get('http://localhost:8001/states')
            .then(function(retObj2) {


                $log.log("loading states from localhost, state name will be available!");
                stlist = retObj2.data;

                stlist.forEach(function(item){
                    $scope.usStates.push(item.name);
                });
                $log.log("States name is ready for auto complete");

            });

        $( "input#stName" ).autocomplete({
            source: $scope.usStates
        });

        //alert("finished?");


    }]);






})(angular);
