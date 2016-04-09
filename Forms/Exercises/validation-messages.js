(function ( angular ) {
  var mod = angular.module( 'customerApp', ['customerServices', 'ngMessages'] );
  mod.controller( 'CustomerCtrl', function ( $scope, $log, $document, customerDAO ) {
    $scope.customers = customerDAO.getCustomers();
    $scope.cities = customerDAO.getCities();
    $scope.countries = customerDAO.getCountries();

    /*
     * Define a function which accepts an NgModelController
     * and returns its $error property if there is an error and the model has
     * been touched.
     */


    var usZip = new RegExp( '^\\d{5}(-\\d{4})?$' );
    var ukPostcode = new RegExp( '^[A-Z]{2}\\d \\d[A-Z]{2}$' );
    $scope.postalCodePattern = usZip;

    // Initialize postalCodeValidationMessage


    /*
     * In each of the cases, add a postalCodeValidationMessage
     */
    $scope.$watch('customer.country', function(newVal) {
      switch ( newVal ) {
        case 'USA':
          $scope.postalCodePattern = usZip;

          break;
        case 'UK':
          $scope.postalCodePattern = ukPostcode;

          break;
        default:
          $scope.postalCodePattern = '';
      }
    });


    $scope.editCustomer = function(customer) {
      $scope.customer = customer;
    };

    $scope.resetCities = function(city) {
      if(! city) {
        delete $scope.fobj.city;
      }
    };

    $scope.limitCities = function(country) {
      if (!country) {
        $scope.cities = customerDAO.getCities();
        delete $scope.fobj.country;
      } else {
        $scope.cities = customerDAO.getCitiesByCountry( country );
      }

      $scope.fobj.city = '';
    };

    $document.ready( function () {
      $scope.$watch('dbobj.contactName || dbobj.companyName', function() {
        $log.log( 'dbobj was updated' );
        customerDAO.refresh( $scope.dbobj );
      });

    });

  } );
})( angular );