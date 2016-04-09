(function ( angular ) {
  var mod = angular.module( 'productControllers',
    ['productValues', 'productDataAccess'] );

  mod.controller( 'ProductCtrl', ['$scope', '$cacheFactory', '$log',
    function ( $scope, $cacheFactory, $log ) {
      $log.log( 'Called ProductCtrl.' );

      var cache = $cacheFactory.get( 'productCache' );
      if ( !cache ) {
        $scope.cache = $cacheFactory( 'productCache' );
      }
    }] );

  mod.controller( 'ProductBannerCtrl', ['$scope', '$log',
    function ( $scope, $log ) {

    }] );

  mod.controller( 'ProductSearchCtrl',
    ['$scope', '$log', '$location', 'supplierDAO', 'categoryDAO',
      'listFilterBuilder',
      function ( $scope, $log, $location, supplierDAO, categoryDAO, listFilterBuilder ) {
        $log.log( 'ProductSearchCtrl initialized' );

        $scope.suppliers = supplierDAO.getSuppliers();
        $scope.categories = categoryDAO.getCategories();

        $scope.changeSearch = function ( productName, category, supplier ) {
          $location.path( '/products/list' + listFilterBuilder( productName,
              category, supplier ) );
        };
      }] );

  /*
   * Update this controller to use the new productDAO, don't forget to pass
   * the appropriate parameters
   */
  mod.controller( 'ProductListCtrl',
    ['$scope', '$location', '$log', '$routeParams', 'productDAO',
      function ( $scope, $location, $log, $routeParams, productDAO ) {
        $log.log( 'Called ProductListCtrl' );
        var params = {};
        $routeParams.listFilter.split( '/' ).forEach( function ( item, idx, all ) {
          if ( idx % 2 === 0 ) {
            params[item] = all[idx + 1];

            if ( item.indexOf( 'ID' ) > -1 ) {
              params[item] = Number( params[item] );
            }
          }
        } );

        $log.log( 'Original parameters: ', $routeParams );
        $log.log( 'Incoming parameters: ', params );

        // You will need an appropriate call to productDAO here!
        $scope.products = null;

        $scope.clickProduct = function ( p ) {
          $location.path( '/products/detail/' + p.productID );
        }

      }] );

  /*
   * Update this controller to use the new productDAO
   * Don't forget that you may need to cast the $routeParams value to the
   * appropriate type
   */
  mod.controller( 'ProductDetailCtrl',
    ['$scope', '$routeParams', 'productDAO', '$log',
      function ( $scope, $routeParams, productDAO, $log ) {
        // You will need an appropriate call to productDAO here!
        $scope.product = null;
      }] );
})( angular );

