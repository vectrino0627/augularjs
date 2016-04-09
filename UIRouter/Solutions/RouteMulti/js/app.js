(function ( angular ) {

  var mod = angular.module( 'uiRouterMod', ['ui.router', 'uiRouterControllers'] );

  mod.config( function ( $stateProvider, $urlRouterProvider ) {
    $urlRouterProvider.otherwise( '/products' );

    $stateProvider.state( 'products', {
      url : '/products',

      views : {
        list           : {
          templateUrl : 'partials/products-tpl.html',
          controller  : 'ProductListCtrl'
        },
        detail         : {
          templateUrl : 'partials/products-detail-tpl.html',
          controller  : 'ProductDetailCtrl'
        },
        supplierDetail : {
          templateUrl : 'partials/supplier-details-tpl.html',
          controller  : 'SupplierDetailCtrl'
        }
      }

    } )
  } )
})( angular );
