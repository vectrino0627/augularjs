(function ( angular ) {
  var rtControllers = angular.module( 'rtControllers', [] );
  rtControllers.controller( 'MainCtrl', ['$scope', '$log',
    function ( $scope, $log ) {
      $log.log( 'MainCtrl' );
    }] );

  rtControllers.controller( 'CustListCtrl', ['$scope', '$log',
    function ( $scope, $log ) {
      $log.log( 'CustListCtrl' );
    }] );

  rtControllers.controller( 'CustDetailCtrl', ['$scope', '$routeParams', '$log',
    function ( $scope, $routeParams, $log ) {
      $scope.customerID = $routeParams.custID;
      $log.log( 'CustDetailCtrl invoked with customer id: %s', $routeParams.custID );

    }] );

})( angular );
