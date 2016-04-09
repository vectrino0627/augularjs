(function ( angular, _ ) {
  var mod = angular.module( 'routerServices', [] );

  mod.factory( 'customerStatics', function ( $http, $log ) {
    var tmpObj = {
      loaded : false
    };

    var retObj = {
      getCities : function () {
        return tmpObj.cities;
      },

      getCustomer: function(id) {
        return tmpObj.customerById[id];
      },

      getCitiesByCountry : function(country) {
        return tmpObj.citiesByCountry[country];
      },

      getCountries : function () {
        return tmpObj.countries
      },

      getUniqueCities : function () {
        return tmpObj.uniqueCities;
      },

      getUniqueCountries : function () {
        return tmpObj.uniqueCountries;
      },

      getCompanies : function () {
        return tmpObj.companyNames;
      },

      getCustomers : function () {
        return tmpObj.customers
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

    var p = $http.get( 'http://localhost:8001/northwind/customers' )
      .then( function ( ret ) {
        tmpObj.cities = _.pluck( ret.data, 'city' ).sort();
        tmpObj.uniqueCities = _.uniq( tmpObj.cities );

        tmpObj.countries = _.pluck( ret.data, 'country' ).sort();
        tmpObj.uniqueCountries = _.uniq( tmpObj.countries );

        tmpObj.companyNames = _.pluck( ret.data, 'companyName' ).sort();

        tmpObj.customers = ret.data;

        tmpObj.citiesByCountry = {};
        tmpObj.customerById = {};

        tmpObj.customers.forEach(function(customer) {

          var ary;
          if (!  tmpObj.citiesByCountry[customer.country]) {
            tmpObj.citiesByCountry[customer.country] = [];
          }

          if (! _.contains( tmpObj.citiesByCountry[customer.country], customer.city)) {
            tmpObj.citiesByCountry[customer.country].push( customer.city );
          }

          tmpObj.customerById[customer.customerID] = customer;

        });


        tmpObj.loaded = true;

        return retObj;
      } );

    return retObj;

  } )

})( angular, _ );