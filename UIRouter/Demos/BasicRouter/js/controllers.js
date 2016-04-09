(function(angular) {
  var mod = angular.module( 'uiRouterControllers', [] );

  mod.controller('MainCtrl', function($scope, $log) {
    $log.log( 'MainCtrl invoked' );
  })

})(angular);

