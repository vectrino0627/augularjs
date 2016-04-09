(function ( angular ) {
  var mod = angular.module( 'customerApp', ['customerServices'] );
  mod.controller( 'CustomerCtrl', function ( $scope, $log, $document, customerDAO ) {
    $scope.customers = customerDAO.getCustomers();
    $scope.cities = customerDAO.getCities();
    $scope.countries = customerDAO.getCountries();

    // Here are two zip/postal code Regular Expressions
    var usZip = new RegExp( '^\\d{5}(-\\d{4})?$' );
    var ukPostcode = new RegExp( '^[A-Z]{2}\\d \\d[A-Z]{2}$' );

    // Set postalCodePattern's default to be usZip
    $scope.postalCodePattern = usZip;

    /*
     * Write a watch on customer.country
     * If it's USA, set postalCodePattern to usZip
     * If it's UK, set postalCodePattern to ukPostcode
     * Default should be no pattern
     *
     * Challenge: Add Canada (following UK postcode rules) to the list
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