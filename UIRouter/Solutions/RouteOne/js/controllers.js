(function ( angular ) {
  var mod = angular.module( 'uiRouterControllers', ['productServices'] );

  mod.controller( 'MainCtrl', function ( $scope, $log ) {
    $log.log( 'MainCtrl invoked' );
  } );

  mod.controller( 'ProductListCtrl', function ( $scope, $log, productDAO ) {
    $log.log( 'ProductListCtrl loaded' );
    $scope.products = productDAO.getProducts();
  } );

  /*
   * Create ProductDetailCtrl such that the passed parameter (productID) is used
   * to retrieve a specific product (hint: getProduct) and copy it over to
   * $scope.product
   *
   */
  mod.controller( 'ProductDetailCtrl',
    function ( $scope, $log, $stateParams, productDAO ) {
      $scope.product = productDAO.getProduct( $stateParams.productID );
    } )

})( angular );

