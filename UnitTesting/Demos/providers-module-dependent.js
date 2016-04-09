(function(angular) {
  var mod = angular.module( 'providerApp', ['dependentModule'] );


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