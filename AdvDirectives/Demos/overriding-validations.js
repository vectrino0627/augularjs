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

  mod.directive('limitDate', function($log) {
    var lowDate = new Date( '2015-01-01' ),
      highDate = new Date();
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attrs, modelCtrl) {
        if(modelCtrl) {
          modelCtrl.$validators.date = function(modelValue, viewValue) {
            $log.log( 'modelValue: ', modelValue );
            $log.log( 'viewValue: ', viewValue );

            if (modelValue >= lowDate && modelValue <= highDate) {
              return true;
            }

            return false;
          };
        }
      }
    }

  })
})( angular );