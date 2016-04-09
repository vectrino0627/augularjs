(function ( angular ) {
  var mod = angular.module( 'employeeApp', [] );
  mod.controller( 'EmployeeMainCtrl', function ( $scope, $http ) {
    var p = $http.get( 'http://localhost:8001/northwind/employees/1' );
    p.then( function ( retObj ) {
      $scope.emp = retObj.data;
    } );

  } );
})( angular );