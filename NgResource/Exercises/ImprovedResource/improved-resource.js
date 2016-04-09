(function ( angular ) {
  var mod = angular.module( 'customerApp', ['ngResource', 'ngMessages'] );
  mod.controller( 'CustomerCtrl',
    function ( $scope, $log, $document, $resource ) {

      /*
       * Move Customer to a factory called (unsurprisingly) Customer
       * Add a dependency to this controller on Customer
       * Add three custom actions to Customer:
       * 1) countries: Retrieve a unique list of countries
       * 2) cities: Retrieve a unique list of cities
       * 3) citiesByCountry: Retrieve a unique list of cities based on
       *    the country passed in. Recall that the url /northwind/f/city/country
       *    will give you an array of city+country objects. Use an interceptor
       *    to iterate over that array and transform it into a unique array
       *    of cities for that country
       *
       */
      var Customer = $resource( 'http://localhost:8001/northwind/customers/:customerID',
        { customerID : '@id' } );

      $document.ready( function () {
        $scope.$watch( 'dbobj.contactName || dbobj.companyName', function () {
          $log.log( 'dbobj was updated' );
          // Use the Customer resource to query using dbobj
          $scope.customers = Customer.query( $scope.dbobj );
        } );

      } );

      $scope.customers = Customer.query();

      // Change these to calls to the appropriate function on Customer
      //$scope.cities = customerDAO.getCities();
      //$scope.countries = customerDAO.getCountries();

      $scope.showMessage = function ( model ) {
        if ( model && model.$touched && model.$error ) {
          return model.$error
        } else {
          return {
            valid : true
          }
        }
      };

      var usZip = new RegExp( '^\\d{5}(-\\d{4})?$' );
      var ukPostcode = new RegExp( '^[A-Z]{2}\\d \\d[A-Z]{2}$' );
      $scope.postalCodePattern = usZip;

      $scope.postalCodeValidationMessage = '';

      $scope.$watch( 'customer.country', function ( newVal ) {
        switch ( newVal ) {
          case 'USA':
            $scope.postalCodePattern = usZip;
            $scope.postalCodeValidationMessage = 'Please add a five-digit zip code.';
            break;
          case 'UK':
            $scope.postalCodePattern = ukPostcode;
            $scope.postalCodeValidationMessage = 'Please add a proper post code.';
            break;
          default:
            $scope.postalCodePattern = '';
        }
      } );

      $scope.editCustomer = function ( customer ) {
        $scope.customer = customer;
        $scope.customerID = customer.customerID;
      };

      $scope.resetCities = function ( city ) {
        if ( !city ) {
          delete $scope.fobj.city;
        }
      };

      /*
       * Uncomment this function
       * Change references to customerDAO to Customer
       * Change function calls on Customer as appropriate
       * Change the call to getCitiesByCountry to take an object where the
       * key is "country" and the value is the country to search by
       */
/*      $scope.limitCities = function ( country ) {
        if ( !country ) {
          $scope.cities = customerDAO.getCities();
          delete $scope.fobj.country;
        } else {
          $scope.cities = customerDAO.getCitiesByCountry( country );
        }

        $scope.fobj.city = '';
      };*/

    } );

  /*
   * Uncomment this directive
   * Declare a dependency on Customer (not customerDAO)
   * Change references to customerDAO to Customer
   * Change function calls on Customer as appropriate
   */
/*  mod.directive( 'checkCountry', function ( customerDAO ) {
    var countries = customerDAO.getCountries();

    return {
      restrict : 'A',
      require  : 'ngModel',
      link     : function ( scope, element, attrs, modelCtrl ) {
        modelCtrl.$validators.checkCountry = function ( modelValue ) {
          return countries.indexOf( modelValue ) > -1;
        }
      }
    }
  } );*/

  mod.directive( 'idCheck', function ( $http, $q ) {
    return {
      restrict : 'A',
      require  : 'ngModel',

      link : function ( scope, element, attrs, modelCtrl ) {
        var originalID;

        // Get the original value of the ID
        element.one( 'focus', function () {
          originalID = element.val();
        } );

        modelCtrl.$asyncValidators.idCheck = function ( modelValue ) {
          var def = $q.defer();

          $http( {
            url    : 'http://localhost:8001/northwind/customers/' + modelValue,
            method : 'get'
          } )
            .then( function ( retObj ) {
              var rec = retObj.data;
              if ( !rec ) {
                def.resolve();
              } else {
                if ( rec.customerID === originalID ) {
                  def.resolve();
                }
                def.reject();
              }
            },
            function () {
              def.reject();
            } );
          return def.promise;
        }
      }
    };
  } );
})( angular );