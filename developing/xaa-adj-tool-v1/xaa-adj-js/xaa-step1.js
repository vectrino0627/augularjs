/**
 * Created by nuo134 on 12/21/2015.
 */

(function(angular){
    var app = angular.module("XaaStep1", ['ui.router']);


    app.controller("Step1Ctrl", function ( $scope, $log, $http, $state, $filter ){
        $log.log("Let's get started!");

        $scope.Step2 = function(aobj){


            if($scope.formStep1.$valid)
            {
                var stDate = new Date($scope.fobj.fDate), enDate = new Date($scope.fobj.tDate);
                var dplist = [];

                if(enDate<stDate)
                {
                    $log.log(stDate<enDate);

                    window.alert("Please make sure your date range is correct!");
                }
                else {

                    $http.get('/data/xaa-dept2.json')
                        .then(function(retObj2){



                            $log.log("loading dept info from step1!");
                            dplist = retObj2.data;

                            dplist.forEach(function(item)
                            {

                                if (item.deptID ==$scope.fobj.deptID)
                                {
                                    $log.log("found a match!");
                                    $scope.fobj.deptName =item.deptName;
                                }

                            });

                            if(!$scope.fobj.deptName)
                            {
                                alert("Can't find a match with the deptID you have input, please enter department name:");
                                $state.go('step1');
                                $("#submit").prop('disabled', false).addClass("btn-primary");
                            }


                        });




                    $("#submit").prop('disabled', true).removeClass("btn-primary");
                    window.alert("Pulling info from server, please be patient!");
                    //move to state 2
                    $state.go('step2');
                }
            }
            else {window.alert("Your input is invalid; please make sure you have filled all the required fields");}

        };




    });



    app.directive('jqdatepicker', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ngModelCtrl) {
                element.datepicker({
                    changeMonth: true,
                    changeYear: true,
                    showButtonPanel: true,

                    onSelect: function (date) {

                        ngModelCtrl.$setViewValue(date);
                        scope.$apply();
                    }
                });
            }
        };
    });


})(angular);