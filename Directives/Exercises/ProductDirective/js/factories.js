(function ( angular ) {

  function titleCase( word ) {
    var wordArray = word.split( '' );
    wordArray[0] = wordArray[0].toUpperCase();
    return wordArray.join( '' );
  }

  function getBaseDAO( singular, plural, idField, $http ) {
    var dao = {};
    dao.records = [];
    dao.recordsByID = {};

    dao.refresh = function () {
      dao.records.splice( 0, dao.records.length );
      var dataIds = [];

      $http( {
        url    : 'http://localhost:8001/northwind/' + plural,
        method : 'get'
      } )
        .then( function ( retObj ) {
          retObj.data.forEach( function ( record ) {
            dao.records.push( record );
            dao.recordsByID[record[idField]] = record;
          } );
        } );
    };

    dao['get' + titleCase( singular )] = function ( id ) {
      if ( dao.recordsByID[id] ) {
        return dao.recordsByID[id];
      } else {
        var result = {};
        $http( {
          url : 'http://localhost:8001/northwind/products/' + id
        } )
          .then( function ( retObj ) {
            var record = retObj.data;
            Object.keys( record ).forEach( function ( key ) {
              result[key] = record[key];
            } )
          } );

        return result;
      }
    };

    dao['get' + titleCase( plural )] = function () {
      return dao.records;
    };

    return dao;
  }

  var mod = angular.module( 'productDataAccess', [] );

  mod.factory( 'productDAO', function ( $http, filterFilter ) {
    var dao = getBaseDAO( 'product', 'products', 'productID', $http );
    dao.getProducts = function ( params ) {
      if ( params ) {
        $http( {
          url    : 'http://localhost:8001/northwind/products/',
          method : 'get',
          params : params
        } )
          .then( function ( retObj ) {
            var data = retObj.data;
            dao.records.splice( 0, dao.records.length );
            data.forEach( function ( record ) {
              dao.records.push( record );
            } )
          } );
      }

      return dao.records;
    };

    dao.refresh();
    return dao;
  } );

  mod.factory( 'supplierDAO', function ( $http ) {
    var dao = getBaseDAO( 'supplier', 'suppliers', 'supplierID', $http );
    dao.refresh();
    return dao;
  } );

  mod.factory( 'categoryDAO', function ( $http ) {
    var dao = getBaseDAO( 'category', 'categories', 'categoryID', $http );
    dao.refresh();
    return dao;
  } )
})( angular );
