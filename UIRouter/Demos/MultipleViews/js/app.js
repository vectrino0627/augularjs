(function ( angular ) {

  var mod = angular.module( 'uiRouterMod', ['ui.router', 'uiRouterControllers'] );

  mod.config( function ( $stateProvider, $urlRouterProvider ) {
    $urlRouterProvider.otherwise( '/customers' );

    $stateProvider.state( 'customers', {
      url         : '/customers',
      views : {
        'search' : {
          templateUrl: 'partials/customer-search-tpl.html'
        },
        'list' : {
          templateUrl : 'partials/customers-tpl.html',
          controller: 'CustomerListCtrl'
        },
        'detail' : {
          templateUrl: 'partials/customers-detail-tpl.html',
          controller: 'CustomerDetailCtrl'
        }
      }
    } )
  } )
})( angular );
