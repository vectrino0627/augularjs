(function ( angular ) {
  var mod = angular.module( 'employeeApp', ['employeeServices'] );
  mod.controller( 'EmployeeMainCtrl', function ( $scope ) {
    var usZip = new RegExp( '^\\d{5}(-\\d{4})?$' );
    var ukPostcode = new RegExp( '^[A-Z]{2}\\d \\d[A-Z]{2}$' );
    $scope.postalCodePattern = usZip;

    $scope.$watch('emp.country', function(newVal) {
      switch ( newVal ) {
        case 'US':
          $scope.postalCodePattern = usZip;
          break;
        case 'UK':
          $scope.postalCodePattern = ukPostcode;
          break;
        default:
          $scope.postalCodePattern = '';
      }
    });

  } );
})( angular );