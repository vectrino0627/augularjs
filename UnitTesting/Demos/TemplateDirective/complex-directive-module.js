(function(angular) {
  var mod = angular.module( 'directiveModule', [] );

  mod.directive('dayDisplay', function() {
    return {
      restrict: 'E',
      templateUrl: 'directive-tpl.html',
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
