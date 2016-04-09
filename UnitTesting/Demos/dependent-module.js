(function(angular) {
  var mod = angular.module( 'dependentModule', [] );
  mod.factory('dep1', function($log) {
    $log.info( 'Loaded dep1' );

    return {
      getIdentity : function() {
        return 'dep1';
      }
    }
  });

  mod.factory('dep2', function($log) {
    $log.info( 'Loaded dep2' );

    return {
      getIdentity : function() {
        return 'dep2';
      }
    }
  });

})(angular);
