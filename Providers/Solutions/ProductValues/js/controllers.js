(function ( angular ) {
  var mod = angular.module( 'productControllers', ['productValues'] );

  mod.controller( 'ProductCtrl', ['$scope', '$cacheFactory', '$log',
    function ( $scope, $cacheFactory, $log ) {
      $log.log( 'Called ProductCtrl.' );

      var cache = $cacheFactory.get( 'productCache' );
      if (!cache) {
        $scope.cache = $cacheFactory( 'productCache' );
      }
    }] );

  mod.controller( 'ProductBannerCtrl', ['$scope', '$log',
    function ( $scope, $log ) {

    }] );

  mod.controller( 'ProductSearchCtrl', ['$scope', '$log', '$http', '$location', 'listFilterBuilder',
    function ( $scope, $log, $http, $location, listFilterBuilder ) {
      $log.log( 'ProductSearchCtrl initialized' );

      $http({
        url: 'http://localhost:8001/northwind/suppliers',
        method: 'get'
      })
        .success(function(data) {
          $scope.suppliers = data;
        });

      $http({
        url: 'http://localhost:8001/northwind/categories',
        method: 'get'
      })
        .success(function(data) {
          $scope.categories= data;
        });

      $scope.changeSearch = function(productName, category, supplier) {
        $location.path( '/products/list' + listFilterBuilder( productName,
            category, supplier ) );
      };
    }] );

  mod.controller( 'ProductListCtrl', ['$scope', '$location', '$log', '$routeParams', '$http',
    function ( $scope, $location, $log, $routeParams, $http ) {
      $log.log( 'Called ProductListCtrl' );
      var params = {};
      $routeParams.listFilter.split('/' ).forEach(function(item, idx, all) {
        if (idx % 2 === 0) {
          params[item] = all[idx + 1];
        }
      });

      $log.log( 'Original parameters: ', $routeParams );
      $log.log( 'Incoming parameters: ', params );

      $http({
        url: 'http://localhost:8001/northwind/products/',
        method: 'get',
        params: params
      } )
        .success(function(data) {
          $scope.products = data;
        });

      $scope.clickProduct = function ( p ) {
        $location.path( '/products/detail/' + p.productID );
      }

    }] );

  mod.controller( 'ProductDetailCtrl', ['$scope', '$routeParams', '$http', '$log',
    function ( $scope, $routeParams, $http, $log ) {
      $http({
        url: 'http://localhost:8001/northwind/products/' + $routeParams.productID,
        method: 'get'
      })
        .success(function(data) {
          $scope.product = data;
        })
    }] );
})( angular );

