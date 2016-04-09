(function(angular) {
  var mod = angular.module( 'directiveModule', [] );

  mod.directive('nwtFooter', function() {
    return {
      restrict: 'E',
      template: '<footer>The Northwind Trading Company &copy;{{ today | date:"yyyy" }}</footer>',
      controller: function($scope) {
        $scope.today = new Date();
      }
    }
  })
})(angular);
