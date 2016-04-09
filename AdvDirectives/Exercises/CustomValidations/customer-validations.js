(function ( angular ) {
  var mod = angular.module( 'customerApp', ['customerServices', 'ngMessages'] );

  /*
   * Create a directive "checkCountry" which uses customerDAO to validate
   * the value of the country field
   */


  /*
   * Create a directive, idCheck. It is an asynchronous check to see if the
   * new value of the customerID field is not already in use.
   * There are a variety of ways to do this, you could use customerDAO
   * (in several different ways), or you could write a custom request to the
   * Northwind RESTful endpoint. Try to get a simple version working before
   * worrying about edge cases.
   */


  mod.controller( 'CustomerCtrl',
    function ( $scope, $log, $document, customerDAO ) {
      $scope.customers = customerDAO.getCustomers();
      $scope.cities = customerDAO.getCities();
      $scope.countries = customerDAO.getCountries();

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

      $scope.limitCities = function ( country ) {
        if ( !country ) {
          $scope.cities = customerDAO.getCities();
          delete $scope.fobj.country;
        } else {
          $scope.cities = customerDAO.getCitiesByCountry( country );
        }

        $scope.fobj.city = '';
      };

      $document.ready( function () {
        $scope.$watch( 'dbobj.contactName || dbobj.companyName', function () {
          $log.log( 'dbobj was updated' );
          customerDAO.refresh( $scope.dbobj );
        } );

      } );
    } );
})( angular );