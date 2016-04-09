(function(angular) {
  var mod = angular.module( 'providerApp', [] );

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

  mod.factory('testFactory', function(dep1, dep2, $log) {
    $log.log( 'Loaded testFactory' );
    $log.log('dep1.getIdentity(): ', dep1.getIdentity());
    $log.log('dep2.getIdentity(): ', dep2.getIdentity());

    return {
      getIdentity : function() {
        return 'testFactory';
      },
      getDep1Identity : function() {
        return dep1.getIdentity();
      }
    }
  })

})(angular);