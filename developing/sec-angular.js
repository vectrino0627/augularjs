/**
 * Created by nuo134 on 12/18/2015.
 */

(function(augular){
    var angApp=angular.module("secApp",[]);

    //this part of code change {{}} to (~ ~) for data representation
    /*angApp.config(function($interpolateProvider){
       $interpolateProvider.startSymbol("(~") ;
        $interpolateProvider.endSymbol("~)") ;
    });*/

    angApp.controller("secCtrl", function($scope){
       $scope.abc="oka!";

        $scope.value = "original Value!!";

        $scope.$watch ('value', function(){
           if($scope.value != 'orgin')
           {
               $scope.message="oopps!";

           }
            else
           {
               $scope.message="okay again!";
           }
        });

    });



})(angular);