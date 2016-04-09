(function(angular) {
  var mod = angular.module( 'directiveModule', [] );

  mod.directive('dayDisplay', function() {
    return {
      restrict: 'E',
      template: '<span>Results: {{ today | date:"EEEE" }}</span>',
      scope : {
        today: '@',
        todayRef: '='
      },
      controller: function($scope) {
        if (! $scope.today ) {
          $scope.today = new Date();
        } else if (!angular.isDate(new Date($scope.today))) {
          $scope.today = new Date();
        }
      }
    }
  })
})(angular);
