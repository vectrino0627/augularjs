(function(angular) {
  var mod = angular.module( 'uiRouterControllers', ['productServices'] );

  mod.controller('MainCtrl', function($scope, $log) {
    $log.log( 'MainCtrl invoked' );
  });

  mod.controller( 'ProductListCtrl', function ( $scope, $log, productDAO ) {
    productDAO.success(function(data) {
      $scope.products = data.getProducts();
    });
  } );

  /*
   * Create ProductDetailCtrl such that the passed parameter (productID) is used
   * to retrieve a specific product (hint: getProduct) and copy it over to
   * $scope.product
   *
   */

})(angular);

