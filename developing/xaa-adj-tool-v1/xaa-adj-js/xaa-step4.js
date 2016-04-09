/**
 * Created by nuo134 on 12/22/2015.
 */

/*
 * Directive 'jqdatepicker2' is calling jquery UI function to show a drop down selection for date picker. return month and year as string
 */

(function(angular){
    var app = angular.module("XaaStep4", ['ui.router']);




    app.controller("Step4Ctrl", function ( $scope, $log, $state ) {

        $scope.actnOps = ['Refund/Decrease Misc $ Amount', 'Increase Misc $ Amount', 'Decrease Volume', 'Increase Volume', 'Others'];
        $log.log("Now, we are in step4!");


        $scope.GoReview = function () {
            window.alert("Moving to Step 1!");
            $state.go('step1');


        };

        $scope.GoStep3 = function () {
            window.alert("Moving to Step 3!");
            $state.go('step3');


        };

        $scope.AddRecord = function () {
            window.alert("Adding records!");
            var newAdj = angular.copy($scope.cnt);
            $scope.compAdj.push(newAdj);
            $scope.cnt={};


        };
    });




    app.directive('jqdatepicker2', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ngModelCtrl) {
                element.datepicker({
                    changeMonth: true,
                    changeYear: true,
                    showButtonPanel: true,
                    dateFormat: 'MM yy',
                    onSelect: function (date) {
                        ngModelCtrl.$setViewValue(date);
                        scope.$apply();
                    }
                });
            }
        };
    });



})(angular);