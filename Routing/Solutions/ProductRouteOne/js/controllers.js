(function ( angular ) {
  var prodControllers = angular.module( 'productControllers', [] );

// Uncomment the section below
// Fill in the details on ProductDetailCtrl, making sure to include $routeParams
// as a dependenct and to use it to indicate what the requested product id was

  prodControllers.controller( 'ProductDetailCtrl', ['$scope', '$routeParams', '$log',
    function ( $scope, $routeParams, $log ) {
      $scope.productID = $routeParams.productID;
      $log.log( 'ProductDetailCtrl invoked with product id: %s', $scope.productID );
    }] );

  prodControllers.controller( 'ProductCtrl', ['$scope', '$log',
    function ( $scope, $log ) {
      $log.log( 'Called ProductCtrl.' );
    }] );

  prodControllers.controller( 'ProductListCtrl', ['$scope', '$log',
    function ( $scope, $log ) {
      $log.log( 'Called ProductListCtrl' );
    }] );

// If everything works, you should be able to browse to the
// ProductRouteOne folder and go back and forth between views.
})( angular );
