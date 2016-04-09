/**
 * Created by nuo134 on 1/6/2016.
 */



(function(angular){
    var app = angular.module("Step2", ['ui.router']);





    app.controller("Step2Ctrl", function ( $scope, $log, $state, $http, $filter){
        $log.log("Now, we are in step2 of play house!");
        //window.alert("pulling info from server, please be patient!");

        //var $scope.dinfo;



    });






})(angular);