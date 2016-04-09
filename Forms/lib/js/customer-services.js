(function ( angular ) {
  var mod = angular.module( 'customerServices', [] );

  mod.factory( 'customerDAO', function ( $http ) {

    var dao = {
      customers       : [],
      cities          : [],
      countries       : [],
      companyNames    : [],
      customerById    : {},
      citiesByCountry : {},
      loaded          : false
    };

    dao.refresh = function ( query ) {

      dao.customers.splice( 0, dao.customers.length );
      dao.cities.splice( 0, dao.cities.length );
      dao.countries.splice( 0, dao.countries.length );
      dao.companyNames.splice( 0, dao.companyNames.length );
      dao.loaded = false;

      var p = $http( {
        url    : 'http://localhost:8001/northwind/customers',
        method : 'get',
        params : query
      } );

      var p2 = p.then( function ( retObj ) {
        var data = retObj.data;
        data.forEach( function ( record ) {
          dao.customers.push( record );
          if ( dao.cities.indexOf( record.city ) === -1 ) dao.cities.push( record.city );
          if ( dao.countries.indexOf( record.country ) === -1 ) dao.countries.push( record.country );
          if ( dao.companyNames.indexOf( record.companyNames ) === -1 ) dao.companyNames.push( record.companyNames );

          dao.customerById[record.customerID] = record;
          if ( !dao.citiesByCountry[record.country] ) {
            dao.citiesByCountry[record.country] = [];
          }

          if ( dao.citiesByCountry[record.country].indexOf( record.city ) === -1 ) {
            dao.citiesByCountry[record.country].push( record.city );
          }

          dao.loaded = true;
        } );

        dao.p = p;
      } );

      p2.then(function() {
        dao.cities.sort();
        dao.countries.sort();
        dao.companyNames.sort();
      })
    };

    dao.getCustomers = function () {
      return dao.customers;
    };

    dao.getCities = function () {
      return dao.cities;
    };

    dao.getCustomer = function ( id ) {
      var customer = {};
      var p = $http({
        url: 'http://localhost:8001/northwind/customers/' +id,
        method: 'get'
      })
        .then(function(retObj) {
          angular.extend( customer, retObj.data );
        });

      return customer;
    };

    dao.getCitiesByCountry = function ( country ) {
      return dao.citiesByCountry[country];
    };

    dao.getCountries = function () {
      return dao.countries
    };

    dao.getCompanies = function () {
      return dao.companyNames;
    };

    dao.getCustomers = function () {
      return dao.customers
    };

    dao.isLoaded = function () {
      return dao.loaded;
    };

    dao.getPromise = function () {
      return dao.p;
    };

    dao.success = function ( fn ) {
      dao.p.then( fn );
    };

    dao.refresh();

    return dao;

  } )

})( angular );