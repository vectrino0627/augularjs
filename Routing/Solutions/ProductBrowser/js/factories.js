(function (angular) {
  var mod = angular.module( 'productsDataAccess', [] );

  mod.factory( 'productDAO', function ( $http, $cacheFactory, $log, filterFilter ) {
    var products = [],
        retObj = {},
        cache = $cacheFactory('productDAO' ),
        url = 'http://localhost:8001/northwind/products',
        p = null;

    p = $http({
      url: 'http://localhost:8001/northwind/products',
      method: 'get',
      cache: cache
    });

    p.success(function(data) {
      products = data;
    });

    retObj.getAllProducts = function() {
      return products;
    };

    retObj.findProductsSync = function(criteria) {
      return filterFilter( products, criteria );
    };

    retObj.findProductsRest = function(params) {
      return $http({
        url: url,
        method: 'get',
        cache: cache,
        params: params
      });
    };

    return retObj;
  } );

  mod.factory( 'supplierDAO', function ( $http, $log ) {
    $log.log( 'supplierDAO initialized' );
    var suppliers = [],
        dropDown = [],
        retObj = {
          loaded : false
        };

    var p = $http( {
      url    : 'http://localhost:8001/northwind/suppliers/',
      method : 'get'
    } );

    var retP = p.success( function ( data ) {
      retObj.loaded = true;
      suppliers = data;
      dropDown = suppliers.map( function ( supplier ) {
        return _.pick( supplier, 'supplierID', 'companyName' );
      } );
    } );

    retObj.getSuppliers = function () {
      return suppliers;
    };

    retObj.getValues = function ( field ) {
      return _.pluck( suppliers, field );
    };

    retObj.getDropDown = function () {
      return dropDown;
    };

    retObj.getPromise = function () {
      return retP;
    };

    return retObj;
  } )
})( angular );
