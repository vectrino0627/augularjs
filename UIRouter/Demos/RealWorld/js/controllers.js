(function ( angular ) {
  var mod = angular.module( 'uiRouterControllers', ['routerServices'] );

  mod.controller( 'MainCtrl', function ( $scope, $log ) {
    $log.log( 'MainCtrl invoked' );
  } );

  mod.controller( 'CustomerListCtrl',
    function ( $scope, $log, customerDAO ) {
      $scope.customers = customerDAO.getCustomers();
    } );

  mod.controller( 'CustomerDetailCtrl',
    function ( $scope, $log, $stateParams, customerDAO ) {
      $scope.customer = customerDAO.getCustomer( $stateParams.customerID );
    } )

})( angular );

