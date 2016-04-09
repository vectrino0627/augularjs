/**
 * Created by NUO134 on 12/21/2015.
 */

/*
This is the main angularjs module to create xaa adjust tool in a web page

 */

(function(angular){
    var app = angular.module("XaaModule", ['ui.router', 'XaaStep1','XaaStep2','XaaStep3','XaaStep4'] );


    app.config( function ( $stateProvider, $urlRouterProvider ) {
        $stateProvider.state( 'step1', {
                url         : '/step1',
                templateUrl : 'xaa-partials/xaa-step1.html'
            } )
            .state( 'step2', {
                url         : '/step2',
                templateUrl : 'xaa-partials/xaa-step2.html'

            } )
            .state( 'step3', {
                url         : '/step3',
                templateUrl : 'xaa-partials/xaa-step3.html'
            } )
            .state( 'step4', {
                url         : '/step4',
                templateUrl : 'xaa-partials/xaa-step4.html'
            } );
//default page will be step 1.
        $urlRouterProvider.otherwise( '/step1' );
    } );



    app.controller("MainCtrl",["$scope", "$http", "$filter", function($scope,$http,$filter){
        //$http.get().then();

        $scope.abc="Dept ID:";
        $scope.bkacct={}; $scope.fuser={}; $scope.fobj={}; $scope.cnt={};$scope.compAdj=[];
        $scope.selList=[];$scope.dinfo=[];
        //$scope.dinfo=[];

    }]);

    app.filter('unique', function() {
        return function(input, key) {
            var unique = {};
            var uniqueList = [];
            if(input) {
                for (var i = 0; i < input.length; i++) {
                    if (typeof unique[input[i][key]] == "undefined") {
                        unique[input[i][key]] = "";
                        uniqueList.push(input[i]);
                    }
                }
            }
            return uniqueList;
        };
    });

})(angular);



