(function ( angular, _ ) {
  var mod = angular.module( 'routerServices', [] );

  mod.factory( 'customerDAO', function ( $http, $log ) {
    var tmpObj = {
      loaded : false
    };

    tmpObj.cities = [];
    tmpObj.uniqueCities = [];
    tmpObj.countries = [];
    tmpObj.uniqueCountries = [];
    tmpObj.companyNames = [];
    tmpObj.customers = [];
    tmpObj.citiesByCountry = [];
    tmpObj.customerById = {};

    var p = null;

    var retObj = {
      getCities : function () {
        return tmpObj.cities;
      },

      getCustomer : function ( id ) {
        $log.log( 'Called getCustomer(%s)', id );
        if (!tmpObj.customerById[id]) {
          tmpObj.customerById[id] = {};
        }
        return tmpObj.customerById[id];
      },

      getCustomers : function () {
        return tmpObj.customers
      },

      getCitiesByCountry : function ( country ) {
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

      isLoaded : function () {
        return tmpObj.loaded;
      },

      getPromise : function () {
        return p;
      },

      success : function ( fn ) {
        p.then( fn );
      },

      refresh : function () {
        tmpObj.loaded = false;
        p = $http.get( 'http://localhost:8001/northwind/customers' )
          .then( function ( ret ) {

            tmpObj.cities.splice( 0, tmpObj.cities.length );
            tmpObj.uniqueCities.splice( 0, tmpObj.uniqueCities.length );
            tmpObj.countries.splice( 0, tmpObj.countries.length );
            tmpObj.uniqueCountries.splice( 0, tmpObj.uniqueCountries.length );
            tmpObj.companyNames.splice( 0, tmpObj.companyNames.length );
            tmpObj.customers.splice( 0, tmpObj.customers.length );
            //tmpObj.customers = [];
            tmpObj.citiesByCountry.splice( 0, tmpObj.citiesByCountry.length );

            ret.data.forEach( function ( rec ) {
              tmpObj.cities.push( rec.city );
              tmpObj.countries.push( rec.country );
              tmpObj.companyNames.push( rec.companyName );
              tmpObj.customers.push( rec );

              if ( !tmpObj.citiesByCountry[rec.country] ) {
                tmpObj.citiesByCountry[rec.country] = [];
              }

              if ( !_.contains( tmpObj.citiesByCountry[rec.country], rec.city ) ) {
                tmpObj.citiesByCountry[rec.country].push( rec.city );
              }

              if (! tmpObj.customerById[rec.customerID]) {
                tmpObj.customerById[rec.customerID] = {};
              }

              Object.keys( rec ).forEach( function ( key ) {
                tmpObj.customerById[rec.customerID][key] = rec[key];
              } );

            } );

            _.uniq(tmpObj.cities ).forEach(function(city) {
              tmpObj.uniqueCities.push( city );
            });

            _.uniq(tmpObj.countries ).forEach(function(country) {
              tmpObj.uniqueCountries.push( country );
            });

            tmpObj.loaded = true;

          } );
      }
    };

    retObj.refresh();
    return retObj;
  } )

})( angular, _ );