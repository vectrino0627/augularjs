/**
 * Created by nuo134 on 12/22/2015.
 */


(function(angular){
    var app = angular.module("XaaStep2", ['ui.router']);

    app.controller("Step2Ctrl", function ( $scope, $log, $state, $http ){
        $log.log("Now, we are in step2!");
        //window.alert("pulling info from server, please be patient!");

        $scope.GoStep3 = function(){
            window.alert("Moving to Step 3!");
            $state.go('step3');


        };

        $scope.GoStep1 = function(){
            window.alert("Moving to Step 1!");
            $state.go('step1');


        };

    });



})(angular);