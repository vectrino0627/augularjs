(function ( angular ) {
  var mod = angular.module( 'uiRouterControllers', ['routerServices'] );

  mod.controller( 'MainCtrl', function ( $scope, $log, customerDAO ) {
    $log.log( 'MainCtrl invoked' );

    $scope.cities = customerDAO.getUniqueCities();
    $scope.countries = customerDAO.getUniqueCountries();
    $scope.companies = customerDAO.getCompanies();

    $scope.resetCities = function ( city ) {

      if ( !city ) {
        delete $scope.fobj.city;
      }
    };

    $scope.limitCities = function ( country ) {
      if ( !country ) {
        $scope.cities = customerDAO.getUniqueCities();
        delete $scope.fobj.country;
      } else {
        $scope.cities = customerDAO.getCitiesByCountry( country );
      }

      $scope.fobj.city = '';
    };
  } );

  mod.controller( 'CustomerListCtrl', function ( $scope, $log, customerDAO ) {
    $scope.customers = customerDAO.getCustomers();
  } );

  mod.controller( 'CustomerDetailCtrl', function ( $scope, $log, $stateParams, customerDAO ) {
    $scope.customer = customerDAO.getCustomer( $stateParams.customerID );
  } )

})( angular );

