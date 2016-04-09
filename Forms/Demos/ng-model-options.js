(function ( angular ) {
  var mod = angular.module( 'employeeApp', ['employeeServices'] );
  mod.controller( 'EmployeeMainCtrl', function ( $scope, employeeDAO ) {

    $scope.emp = employeeDAO.getEmployee( 1 );

  } );
})( angular );