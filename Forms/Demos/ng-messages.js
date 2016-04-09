(function ( angular ) {
  var mod = angular.module( 'employeeApp', ['employeeServices', 'ngMessages'] );
  mod.controller( 'EmployeeMainCtrl', function ( $scope ) {

    $scope.showMessage = function(model) {
      if (model && model.$touched && model.$error) {
        return model.$error
      } else {
        return {
          valid: true
        }
      }
    };

    var usZip = new RegExp( '^\\d{5}$' );
    var ukPostcode = new RegExp( '^[A-Z]{2}\\d \\d[A-Z]{2}$' );
    $scope.postalCodePattern = usZip;

    $scope.$watch( 'emp.country', function ( newVal ) {
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
    } );

  } );
})( angular );