(function ( angular ) {
  var mod = angular.module( 'uiRouterControllers', ['productServices', 'ui.router'] );

  mod.controller( 'MainCtrl', function ( $scope, $log ) {
    $log.log( 'MainCtrl invoked' );
    $scope.$on( 'pickProduct', function ( event, product ) {
      $scope.$broadcast( 'broadcastProduct', product );
    } );

    $scope.$on( 'showSupplier', function ( event, supplier ) {
      $scope.$broadcast( 'broadcastSupplier', supplier );
    } )
  } );

  mod.controller( 'ProductListCtrl', function ( $scope, $log, productDAO ) {
    productDAO.success( function ( data ) {
      $scope.products = data.getProducts();
    } );

    $scope.pickProduct = function ( product ) {
      $scope.$emit( 'pickProduct', product );
    }
  } );

  mod.controller( 'ProductDetailCtrl', function ( $scope, $stateParams, productDAO, $log ) {
    $log.log( $stateParams );
    if ( $stateParams.productID ) {
      $log.log('$stateParams.productID: ', $stateParams.productID);
      productDAO.success( function () {
        $scope.product = productDAO.getProduct( $stateParams.productID );
      } )
    } else {
      $log.log('No $stateParams.productID');
      $scope.$on( 'broadcastProduct', function ( event, product ) {
        $scope.product = product;
      } );
    }

    $scope.showSupplier = function ( supplier ) {
      $scope.$emit( 'showSupplier', supplier );
    }

  } );

  mod.controller( 'SupplierDetailCtrl', function ( $scope ) {
    $scope.$on( 'broadcastSupplier', function ( event, supplier ) {
      $scope.supplier = supplier;
    } );

    // Blank out $scope.supplier on broadcastProduct?
    $scope.$on( 'broadcastProduct', function () {
      $scope.supplier = null;

      // With this line, the supplier would always display.
      //$scope.supplier = product.supplier;
    } )
  } )

})( angular );

