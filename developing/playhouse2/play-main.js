/**
 * Created by nuo134 on 1/6/2016.
 */

/*
 This is the main angularjs module to create xaa adjust tool in a web page

 */

(function(angular){
    var app = angular.module("XaaModule", ['ui.router', 'Step1','Step2'] );


    app.config( function ( $stateProvider, $urlRouterProvider ) {
        $stateProvider.state( 'step1', {
                url         : '/step1',
                templateUrl : 'play-partial1.html'
            } )
            .state( 'step2', {
                url         : '/step2',
                templateUrl : 'xaa-partials/xaa-step2.html'

            } )
            ;
//default page will be step 1.
        $urlRouterProvider.otherwise( '/step1' );
    } );



    app.controller("MainCtrl",["$scope", "$http", "$filter", function($scope,$http,$filter){
        //$http.get().then();

        $scope.abc="Dept ID:";
        $scope.bkacct={}; $scope.fuser={}; $scope.fobj={}; $scope.cnt={};$scope.compAdj=[];
        $scope.selList=[];

        $scope.roles = [
            {"id": 1, "name": "Manager", "assignable": true},
            {"id": 2, "name": "Developer", "assignable": true},
            {"id": 3, "name": "Reporter", "assignable": true}
        ];

        $scope.member = {roles: []};
        $scope.selected_items = [];


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





    app.directive('dropdownMultiselect', function(){
        return {
            restrict: 'E',
            scope:{
                model: '=',
                options: '=',
                pre_selected: '=preSelected'
            },
            template: "<div class='btn-group' ng-class='{open: open}'>"+
            "<button class='btn btn-small'>Select</button>"+
            "<button class='btn btn-small dropdown-toggle' ng-click='open=!open;openDropdown()'><span class='caret'></span></button>"+
            "<ul class='dropdown-menu' aria-labelledby='dropdownMenu'>" +
            "<li><a ng-click='selectAll()'><i class='icon-ok-sign'></i>  Check All</a></li>" +
            "<li><a ng-click='deselectAll();'><i class='icon-remove-sign'></i>  Uncheck All</a></li>" +
            "<li class='divider'></li>" +
            "<li ng-repeat='option in options'> <a ng-click='setSelectedItem()'>{{option.name}}<span ng-class='isChecked(option.id)'>" +
            "</span></a></li>" +
            "</ul>" +
            "</div>" ,
            controller: function($scope){

                $scope.openDropdown = function(){
                    $scope.selected_items = [];
                    for(var i=0; i<$scope.pre_selected.length; i++){
                        $scope.selected_items.push($scope.pre_selected[i].id);
                    }
                };

                $scope.selectAll = function () {
                    $scope.model = _.pluck($scope.options, 'id');
                    console.log($scope.model);
                };
                $scope.deselectAll = function() {
                    $scope.model=[];
                    console.log($scope.model);
                };
                $scope.setSelectedItem = function(){
                    var id = this.option.id;
                    if (_.contains($scope.model, id)) {
                        $scope.model = _.without($scope.model, id);
                    } else {
                        $scope.model.push(id);
                    }
                    console.log($scope.model);
                    return false;
                };
                $scope.isChecked = function (id) {
                    if (_.contains($scope.model, id)) {
                        return 'icon-ok pull-right';
                    }
                    return false;
                };
            }
        }
    });
})(angular);



