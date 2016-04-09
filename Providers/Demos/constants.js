(function(angular) {
  var mod = angular.module( 'constantsApp', ['ngRoute'] );

  mod.constant( 'urlValue', 'foo' );

  mod.config(function($routeProvider, urlValue) {
    $routeProvider.when( '/ccheck/no-constant', {
      template : 'You are not using a constant value'
    } )
      .when( '/ccheck/' + urlValue, {
        template : 'You are using a constant value of "' + urlValue + '"'
      } )
      .otherwise( '/ccheck/no-constant' );
  })

})(angular);