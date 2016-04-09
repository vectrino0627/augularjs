(function ( angular ) {
  var prodControllers = angular.module( 'productControllers', [] );

// Uncomment the section below
// Fill in the details on ProductDetailCtrl, making sure to include $routeParams
// as a dependency and to use it to indicate what the requested product id was

  /*
   prodControllers.controller( 'ProductDetailCtrl',  );
   */

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
