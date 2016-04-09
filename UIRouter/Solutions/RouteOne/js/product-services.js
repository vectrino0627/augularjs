(function ( angular, _ ) {
  var mod = angular.module( 'productServices', [] );

  mod.factory( 'productDAO', function ( $http, $q, $log ) {
    var tmpObj = {
      loaded : false
    };
    tmpObj.productById = {};
    tmpObj.productsBySupplier = {};
    tmpObj.productsByCategory = {};
    tmpObj.products = [];

    var retObj = {
      getProduct : function ( id ) {
        if (! tmpObj.productById[id] ) {
          tmpObj.productById[id] = {};
        }

        return tmpObj.productById[id];
      },

      getProducts : function () {
        return tmpObj.products
      },

      getProductsBySupplier : function(supplier) {
        return tmpObj.productsBySupplier[supplier];
      },

      isLoaded : function () {
        return tmpObj.loaded;
      },

      getPromise : function () {
        return p;
      },

      success : function ( fn ) {
        p.then( fn );
      }
    };

    var promises = {};

    promises.products = $http.get( 'http://localhost:8001/northwind/products' );
    promises.suppliers = $http.get( 'http://localhost:8001/northwind/suppliers' );
    promises.categories = $http.get( 'http://localhost:8001/northwind/categories' );

    var p = $q.all( promises )
      .then( function ( res ) {

        tmpObj.products.splice( 0, tmpObj.products.length );

        res.products.data.forEach( function ( product ) {
          tmpObj.products.push( product );
          product.supplier = _.findWhere( res.suppliers.data, { supplierID : product.supplierID } );
          product.category = _.findWhere( res.categories.data, { categoryID : product.categoryID } );

          if (! tmpObj.productById[product.productID]) {
            tmpObj.productById[product.productID] = {};
          }

          Object.keys(product ).forEach(function(key) {
            tmpObj.productById[product.productID][key] = product[key];
          });

          if (! tmpObj.productsBySupplier[product.supplier.companyName]) {
            tmpObj.productsBySupplier[product.supplier.companyName] = [];
          }

          tmpObj.productsBySupplier[product.supplier.companyName].push(product);

          if (! tmpObj.productsByCategory[product.category.categoryName]) {
            tmpObj.productsByCategory[product.category.categoryName] = [];
          }

          tmpObj.productsByCategory[product.category.categoryName].push(product);

        } );


        tmpObj.loaded = true;

        return retObj;
      } );

    return retObj;

  } )

})( angular, _ );