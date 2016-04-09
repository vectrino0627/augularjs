(function ( angular, _ ) {
  var mod = angular.module( 'productServices', [] );

  mod.factory( 'productDAO', function ( $http, $q, $log ) {

    var dao = {
      products   : [],
      suppliers  : [],
      categories : []
    };

    dao.refresh = function ( query ) {
      dao.products.splice( 0, dao.products.length );
      dao.suppliers.splice( 0, dao.suppliers.length );
      dao.categories.splice( 0, dao.categories.length );

      dao.loaded = false;

      var promises = {};

      promises.products = $http.get( 'http://localhost:8001/northwind/products',
        {
          params : query
        } );
      promises.suppliers = $http.get( 'http://localhost:8001/northwind/suppliers' );
      promises.categories = $http.get( 'http://localhost:8001/northwind/categories' );

      var p = $q.all( promises )
        .then( function ( res ) {

          dao.productById = {};
          dao.productsBySupplier = {};
          dao.productsByCategory = {};

          res.products.data.forEach( function ( product ) {
            dao.products.push( product );
            dao.productById[product.productID] = product;
            product.supplier = _.findWhere( res.suppliers.data,
              { supplierID : product.supplierID } );
            product.category = _.findWhere( res.categories.data,
              { categoryID : product.categoryID } );

            if ( !dao.productsBySupplier[product.supplier.companyName] ) {
              dao.productsBySupplier[product.supplier.companyName] = [];
            }

            dao.productsBySupplier[product.supplier.companyName].push( product );

            if ( !dao.productsByCategory[product.category.categoryName] ) {
              dao.productsByCategory[product.category.categoryName] = [];
            }

            dao.productsByCategory[product.category.categoryName].push( product );

          } );

          dao.loaded = true;
        } );
    };

    dao.getProduct = function ( id, refresh ) {
      if ( refresh ) {

        $http.get( 'http://localhost:8001/northwind/products/' + id )
          .success( function ( data ) {
            angular.extend( dao.productById[id], data );
          } );
      }
      return dao.productById[id];
    };

    dao.getProducts = function () {
      return dao.products;
    };

    dao.getProductsBySupplier = function ( supplier ) {
      return dao.productsBySupplier[supplier];
    };

    dao.isLoaded = function () {
      return dao.loaded;
    };

    dao.refresh();

    return dao;

  } );
})( angular, _ );