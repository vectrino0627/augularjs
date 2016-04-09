/**
 * Created by nuo134 on 12/17/2015.
 */

(function(angular){
    var mod = angular.module('directApp',[]);

    mod.controller("MainCtrl", function($scope, $log){

    $log.log("called mainctrl.");
        $scope.personABC = "bbz";
        $scope.greetFrom = 'RobbiE'
    });

    mod.directive("greeter", function(){

        return {
            template: '<b>Hello, yourName is: {{yourName}} abZ is: {{abZ}}!</b>',
            scope: {yourName: '@yourName',
            abZ: '=abZ'}
        }
    });

    mod.directive("aabc", function($log){

        return {
            template: '<b>Again, myName is: {{myName}}!</b>',
            scope: {myName: '@'
                },
            link: function(scope, element, attrs)
            {

                $log.log('the value of scope.yourName is %s ', scope.greetFrom);
                scope.greetFrom = 'bob';


            }
        }
    });


})(angular);