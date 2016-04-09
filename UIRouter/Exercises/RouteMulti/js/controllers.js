(function(angular) {
  var mod = angular.module( 'uiRouterControllers', ['productServices'] );

  mod.controller('MainCtrl', function($scope, $log) {
    $log.log( 'MainCtrl invoked' );
  });

  mod.controller( 'ProductListCtrl', function ( $scope, $log, productDAO ) {
    productDAO.success(function(data) {
      $scope.products = productDAO.getProducts();
    });
  } );

  mod.controller('ProductDetailCtrl', function($scope, $log, $stateParams, productDAO) {
    productDAO.success(function(obj) {
      $scope.product = obj.getProduct( $stateParams.productID );
    });
  });

  mod.controller('SupplierDetailCtrl', function($scope, $log, $stateParams, productDAO) {
    productDAO.success(function(obj) {
      $scope.supplier = obj.getProduct( $stateParams.productID ).supplier;
    });

  })

})(angular);

