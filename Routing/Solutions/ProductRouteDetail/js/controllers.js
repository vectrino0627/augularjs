(function ( angular ) {
  var prodControllers = angular.module( 'productControllers', [] );

  prodControllers.controller( 'ProductCtrl', ['$scope', '$cacheFactory', '$log', 
    function ( $scope, $cacheFactory, $log ) {
      $log.log( 'Called ProductCtrl.' );

      // Create a cache to store our product information
      $scope.cache = $cacheFactory( 'productCache' );
    }] );

// Add a dependency on the $location service
  prodControllers.controller( 'ProductListCtrl', ['$scope', '$http', '$location', '$log', 
    function ( $scope, $http, $location, $log ) {
      $log.log( 'Called ProductListCtrl' );
      $http( {
        url    : '/data/northwind-products.json',
        method : 'get',
        cache  : $scope.cache
      } )
        .success( function ( products ) {
          $scope.products = products;
        } );

      // Build fetchProduct to redirect to the appropriate route for the clicked-on product
      $scope.fetchProduct = function ( p ) {
        $log.log( p );
        $location.path( '/products/' + p.productID );
      }

    }] );

  prodControllers.controller( 'ProductDetailCtrl', ['$scope', '$routeParams', '$http', '$location', '$log', 
    function ( $scope, $routeParams, $http, $location, $log ) {
      $scope.productID = $routeParams.productID;
      $log.log( 'ProductDetailCtrl invoked with product id: %s', $scope.productID );

      // Make an $http request to /data/northwind-products.json,
      // using the cache we set up in ProductCtrl
      // on success, find the appropriate product in the array and add it to the $scope
      $http( {
        url    : '/data/northwind-products.json',
        method : 'get',
        cache  : $scope.cache
      } )
        .success( function ( products ) {

          products.some( function ( product ) {
            if ( product.productID === Number( $scope.productID ) ) {
              $scope.product = product;
              return true;
            }
          } );

          $scope.products = products;
        } );

      // Then go to partials/product-detail-tpl.html and complete it

      $scope.goBack = function () {
        $location.path( '/products' );
      };

      $scope.findNext = function ( p ) {
        var prodPosition = $scope.products.indexOf( p );
        var nextPos = Math.min( prodPosition + 1, $scope.products.length );
        var newID = $scope.products[nextPos].productID;

        $location.path( '/products/' + newID );
      };

      $scope.findPrevious = function ( p ) {
        var newID = $scope.products[Math.max( 0, ($scope.products.indexOf( p ) - 1) )].productID;
        $location.path( '/products/' + newID );
      }
    }] );

})( angular );
