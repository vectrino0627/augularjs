(function ( angular ) {

  var mod = angular.module( 'uiRouterMod', ['ui.router', 'uiRouterControllers'] );

  /*
   * Build a mod.config that uses $stateProvider and $urlRouterProvider
   * It should follow these rules:
   *
   * /products should load the template at 'partials/products-tpl.html' and the
   * controller 'ProductListCtrl'
   *
   * /products/:productID should load the template at 'partials/products-detail-tpl.html'
   * and the controller 'ProductDetailCtrl'
   *
   * Then move on to controllers.js
   */

  mod.config( function ( $stateProvider, $urlRouterProvider ) {
    $urlRouterProvider.otherwise( '/products' );

    $stateProvider.state( 'products', {
      url         : '/products',
      templateUrl : 'partials/products-tpl.html',
      controller: 'ProductListCtrl'
    } )
      .state('products.detail', {
        url: '/{productID}',
        templateUrl: 'partials/products-detail-tpl.html',
        controller: 'ProductDetailCtrl'
      })

  } )
})( angular );
