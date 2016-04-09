(function ( angular ) {
  var mod = angular.module( 'uiRouterControllers', ['productServices'] );

  mod.controller( 'MainCtrl', function ( $scope, $log ) {
    $log.log( 'MainCtrl invoked' );
  } );

  mod.controller( 'ProductListCtrl', function ( $scope, $log, productDAO ) {
    productDAO.success( function ( data ) {
      $scope.products = data.getProducts();
    } );
  } );

  mod.controller( 'ProductDetailCtrl', function ( $scope, $log, $stateParams, productDAO ) {
    productDAO.success( function ( obj ) {
      $scope.product = obj.getProduct( $stateParams.productID );
    } );
  } );

  /*
   * Build a controller, SupplierDetailCtrl. It will need to retrieve the supplier
   * associated with the current product. As a hint, the current product has a
   * property, product.supplier, which contains the appropriate supplier data
   *
   * Then go to partials/supplier-details-tpl.html
   */
  mod.controller( 'SupplierDetailCtrl', function ( $scope, $log, $stateParams, productDAO ) {
    $scope.supplier = productDAO.getProduct( $stateParams.productID ).supplier;

  } )

})( angular );

