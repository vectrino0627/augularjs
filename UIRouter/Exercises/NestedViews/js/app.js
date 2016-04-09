(function ( angular ) {

  var mod = angular.module( 'uiRouterMod', ['ui.router', 'uiRouterControllers'] );

  mod.config( function ( $stateProvider, $urlRouterProvider ) {
    $urlRouterProvider.otherwise( '/products' );

    $stateProvider.state( 'products', {
      url         : '/products',
      templateUrl : 'partials/products-tpl.html',
      controller: 'ProductListCtrl'
    } )
      .state('products.detail', {
        url: '/:productID',
        templateUrl: 'partials/products-detail-tpl.html',
        controller: 'ProductDetailCtrl'
      });

      /*
       * Add a state called products.detail.supplier
       * It should react when the URL is /supplier and load the template
       * 'partials/supplier-details-tpl.html' and the controller
       * 'SupplierDetailCtrl'
       *
       * Then go to partials/products-detail-tpl.html
       *
       */

  } )
})( angular );
