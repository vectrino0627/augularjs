(function ( angular ) {

  var mod = angular.module( 'uiRouterMod', ['ui.router', 'uiRouterControllers'] );

  mod.config( function ( $stateProvider, $urlRouterProvider ) {

    $stateProvider.state( 'state1', {
      url         : '/state1',
      templateUrl : 'partials/state1.html'
    } )
      .state( 'state1.detail', {
        url         : '/detail',
        templateUrl : 'partials/state1-detail.html'

      } )
      .state( 'state2', {
        url         : '/state2',
        templateUrl : 'partials/state2.html'
      } );

    $urlRouterProvider.otherwise( '/state1' );

  } )

})( angular );
