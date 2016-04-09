(function ( angular ) {
  var mod = angular.module( 'customerApp', ['customerServices'] );
  mod.controller( 'CustomerCtrl', function ( $scope, $log, customerDAO ) {
    $scope.customers = customerDAO.getCustomers();
    $scope.cities = customerDAO.getCities();
    $scope.countries = customerDAO.getCountries();

    /*
     * Add a watch on dbobj.contactName and dbobj.companyName
     * When they change, log it to the console
     * And call customerDAO.refresh, passing in dbobj
     */


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
  } );
})( angular );