(function ( angular ) {
  /*
   * Create a module called ProductBrowser
   * It will have dependencies of ngRoute and productControllers
   */

  var pb = angular.module( 'ProductBrowser', ['ngRoute', 'productControllers'] );

  /*
   * At this point, you can browse to
   * localhost:8000/Routing/Exercises/ProductRouteOne/#/products
   * and you will see a simple message: "Browse our Products".
   * The console will have a message from ProductCtrl as well
   *
   * Once you've tested that, uncomment the configuration below and fill in
   * the when block and the otherwise block
   */

  pb.config( ['$routeProvider',
    function ( $routeProvider ) {
      $routeProvider
        .when( '/products', {
          templateUrl : 'partials/product-list-tpl.html',
          controller  : 'ProductListCtrl'
        } )

        //Add a route so that looking for /products/5 will bring up the page
        //for the product with the productID of 5
        //
        //Add an otherwise call that redirects to '/products' as a default
        .when( '/products/:productID', {
          templateUrl : 'partials/product-detail-tpl.html',
          controller  : 'ProductDetailCtrl'
        } )
        .otherwise( {
          redirectTo : '/products'
        } );
    }] );

// When you're finished, move on to editing controllers.js

})( angular );
