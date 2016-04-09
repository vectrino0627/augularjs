(function ( angular ) {
  var mod = angular.module( 'productControllers', ['productsDataAccess'] );

  mod.controller( 'ProductCtrl', ['$scope', '$cacheFactory', '$log',
    function ( $scope, $cacheFactory, $log ) {
      $log.log( 'Called ProductCtrl.' );

      $scope.cache = $cacheFactory( 'productCache' );

      $scope.$on( 'listSelectProduct', function ( evt, product ) {
        $log.log( 'Broadcasting product %o', product );
        $scope.$broadcast( 'selectProduct', product );
      } );

      $scope.$on( 'filterProducts', function ( evt, products ) {
        $scope.products = products;
      } );

      $scope.$on('nextProduct', function(evt, product, dir) {
        var currentPos = $scope.products.indexOf( product ),
            nextPos = currentPos + dir,
            nextProduct = $scope.products[Math.max(Math.min($scope.products.length - 1, nextPos), 0)];

        $scope.$broadcast( 'selectProduct', nextProduct );
      })
    }] );

  mod.controller( 'ProductBannerCtrl', ['$scope', '$log',
    function ( $scope, $log ) {
      $log.log( 'ProductBannerCtrl initialized. Not much to do.' );
    }] );

  mod.controller( 'ProductSearchListDetailCtrl', ['$scope', '$http', '$log',
    function ( $scope, $http, $log ) {
      $log.log( 'ProductListDetailCtrl initialized' );
    }] );

  mod.controller( 'ProductSearchCtrl', ['$scope', '$log', '$http',
    'supplierDAO', 'productDAO',
    function ( $scope, $log, $http, supplierDAO, productDAO ) {

      $log.log( 'ProductSearchCtrl initialized' );
      function buildParams() {
        var obj = {};
        if ( $scope.supplier && $scope.supplier.supplierID ) {
          obj.supplierID = $scope.supplier.supplierID
        }

        if ( $scope.category && $scope.category.categoryID ) {
          obj.categoryID = $scope.category.categoryID
        }

        if ( $scope.productName ) {
          obj.productName = $scope.productName
        }

        return obj;

      }

      if ( !supplierDAO.loaded ) {
        supplierDAO.getPromise().success( function ( data ) {
          $scope.suppliers = data;
        } );

      } else {
        $scope.suppliers = supplierDAO.getDropDown();
      }

      $http( {
        url    : 'http://localhost:8001/northwind/categories/f/categoryID/categoryName',
        method : 'get'
      } )
        .success( function ( categories ) {
          $scope.categories = categories;
        } );

      $scope.changeSearch = function () {

        $log.log( 'changeSearch called' );

        /*      $http({
         url: 'http://localhost:8001/northwind/products',
         method: 'get',
         params : buildParams()
         } )*/

/*
        productDAO.findProductsRest( buildParams() )
          .success( function ( products ) {
            $scope.$emit( 'filterProducts', products );
          } );
*/

        $scope.$emit( 'filterProducts', productDAO.findProductsSync( buildParams() ) );
      }

    }] );

  mod.controller( 'ProductListCtrl', ['$scope', '$location', '$log',
    function ( $scope, $location, $log ) {
      $log.log( 'Called ProductListCtrl' );

      $scope.clickProduct = function ( p ) {
        $log.log( 'Clicked on %o', p );
        $scope.$emit( 'listSelectProduct', p );
      }

    }] );

  mod.controller( 'ProductDetailCtrl', ['$scope', '$routeParams', '$http', '$log',
    function ( $scope, $routeParams, $http, $log ) {
      $scope.$on( 'selectProduct', function ( evt, product ) {
        $log.log( 'Heard selectProduct %o', product );
        $scope.product = product;
      } );


    }] );
})( angular );

