/**
 * Created by nuo134 on 1/6/2016.
 */


(function(angular){
    var app = angular.module("Step1", ['ui.router']);



    app.controller("Step1Ctrl", function ( $scope, $log, $state, $http, $filter){
        $log.log("Now, we are in step1 of play house!");
        //window.alert("pulling info from server, please be patient!");

        //var $scope.dinfo;

        $http.get('/data/xaa-data.json')
            .then(function(retObj3){

                $log.log("loading info for step3!");
                $scope.dinfo = retObj3.data;
                anum=1;

                $scope.dinfo.forEach(function(item){
                    if (anum%500==0) {
                        $scope.selList.push(item.compNum);
                    }
                    anum=anum+1;
                });


                $log.log($scope.dinfo.length + " records found!");
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

            link: function (scope, element, attrs, ngModelCtrl) {
                //element.dialog();
                element.autocomplete({
                    source: ['1','2','3','11','22','123','1234','12253'],
                    autoFocus: true,
                    position: { my : "right top", at: "right bottom", collision: "absolute"  },
                //{ position: absolute; cursor: default;z-index:30 !important;}
                open: function(  ) {}
                    /*onSelect: function () {

                     scope.$apply();
                     }*/
                });
            }
        };
    });




})(angular);