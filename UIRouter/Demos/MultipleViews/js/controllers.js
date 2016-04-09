(function ( angular ) {
  var mod = angular.module( 'uiRouterControllers', ['routerServices'] );

  mod.controller( 'MainCtrl', function ( $scope, $log, customerDAO ) {
    $log.log( 'MainCtrl invoked' );

    $scope.fobj = {};

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

    $scope.$on( 'selectedCustomer', function ( event, customer ) {
      $scope.$broadcast( 'broadcastCustomer', customer );
    } )
  } );

  mod.controller( 'CustomerListCtrl', function ( $scope, $log, customerDAO ) {
    $scope.customers = customerDAO.getCustomers();

    $scope.selectCustomer = function ( customer ) {
      $scope.$emit( 'selectedCustomer', customer );
    }
  } );

  mod.controller( 'CustomerDetailCtrl', function ( $scope, $log ) {
    $scope.$on( 'broadcastCustomer', function ( event, customer ) {
      $scope.customer = customer;
    } )
  } )

})( angular );

