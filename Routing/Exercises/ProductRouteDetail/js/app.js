(function ( angular ) {
  var pb = angular.module( 'ProductBrowser', ['ngRoute', 'productControllers'] );
  pb.config( ['$routeProvider',
    function ( $routeProvider ) {
      $routeProvider
        .when( '/products', {
          templateUrl : 'partials/product-list-tpl.html',
          controller  : 'ProductListCtrl'
        } )
        .when( '/products/:productID', {
          templateUrl : 'partials/product-detail-tpl.html',
          controller  : 'ProductDetailCtrl'
        } )
        .otherwise( {
          redirectTo : '/products'
        } );
    }] );

})( angular );
