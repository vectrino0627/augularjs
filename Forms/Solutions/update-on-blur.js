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
    //$scope.$watch('dbobj.contactName || dbobj.companyName', function(newValue, oldValue) {
    $scope.$watchGroup(['dbobj.contactName', 'dbobj.companyName'], function(newValue, oldValue) {
      $log.log( 'dbobj was updated to %s', newValue.toString() );
      $log.log('previously, dbobj was %s', oldValue.toString() );
      customerDAO.refresh( $scope.dbobj );
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
  } );
})( angular );