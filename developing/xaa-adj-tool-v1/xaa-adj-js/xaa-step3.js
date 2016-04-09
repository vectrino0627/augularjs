/**
 * Created by nuo134 on 12/22/2015.
 */

/*If you choose the correct Bank Number and
 Composite Region/Segment, the Composite Name,
 Treasury Management Sales Officer, and
 Results Charge Account fields will automatically complete. (The
 Composite Region/Segment choice also drives the approvers, if
 approvers are required. See page 3 for details about approvals.)
    */



(function(angular){
    var app = angular.module("XaaStep3", ['ui.router']);





    app.controller("Step3Ctrl", function ( $scope, $log, $state, $http, $filter){
        $log.log("Now, we are in step3!");
        //window.alert("pulling info from server, please be patient!");

        //var $scope.dinfo;

        $http.get('/data/xaa-data.json')
            .then(function(retObj3){

                $log.log("loading info for step3!" +$scope.selList.length );
                $scope.dinfo = retObj3.data;


                var tempStr;

                $scope.dinfo.forEach(function(item){
                    tempStr = item.compNum.toString()+" | " + item.relationName;
                    if ($scope.selList.length==0) {
                        $scope.selList.push(tempStr);
                    }
                    else if($scope.selList.indexOf(tempStr)==-1)
                    {
                        $scope.selList.push(tempStr);
                    }

                });
                $scope.selList.sort(function(a, b){return a-b});


                $log.log($scope.dinfo.length + " records found! " + $scope.selList.length);
                /*$scope.dinfo.forEach(function(item){
                    $log.log(item.bankID);
                });
*/
                });




        /*$( "input#compNum" ).autocomplete({
            source: $scope.selList,
            /!*minLength: 3,
            delay: 50*!/
        });*/




        $scope.GoStep4 = function(){
            window.alert("Moving to Step 4!");
            $state.go('step4');


        };

        $scope.GoStep2 = function(){
            window.alert("Moving to Step 2!");
            $state.go('step2');


        };

    });

    app.directive('jqautocomp', function () {
        return {
            restrict: 'A',
            require: 'ngModel',

            link: function (scope, element, attrs, ngModelCtrl) {
                element.autocomplete({
                    source: scope.selList,
                    autoFocus: true,
                    //position: { my : "right top", at: "right bottom", collision: "fit"  },
                    //autoFill: true,
                    //open: function(  ) {}
                    minLength: 2,
                    max:20,
                    select: function( event, ui ){
                        //alert("selected");
                        ngModelCtrl.$setViewValue(ui.item.label);
                        scope.$apply()
                    }
                });
            }
        };
    });




})(angular);