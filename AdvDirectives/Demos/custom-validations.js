(function ( angular ) {
  var mod = angular.module( 'employeeApp', ['employeeServices', 'ngMessages'] );
  mod.controller( 'EmployeeMainCtrl', function ( $scope ) {

    $scope.showMessage = function ( model ) {
      if ( model && model.$touched && model.$error ) {
        return model.$error
      } else {
        return {
          valid : true
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

  mod.directive( 'bizCountries', function ( $log ) {
    var countries = ['USA', 'UK', 'Spain', 'Japan'];

    return {
      restrict : 'A',
      require  : 'ngModel',

      link : function ( scope, element, attrs, modelCtrl ) {
        modelCtrl.$validators.bizCountries = function ( modelValue, viewValue ) {
          $log.log( 'bizCountries: $validator called.' );
          return countries.indexOf( modelValue ) > -1;
        }
      }
    };
  } );

  mod.directive( 'cityCheck', function ( $http, $q, $log ) {
    var cities = [];

    var p = $http( {
      url    : 'http://localhost:8001/northwind/employees/f/city',
      method : 'get'
    } )
      .then( function ( retObj ) {
        retObj.data.forEach( function ( record ) {
          cities.push( record );
        } )
      } );

    return {
      restrict : 'A',
      require  : 'ngModel',
      link     : function ( scope, element, attrs, modelCtrl ) {
        modelCtrl.$asyncValidators.cityCheck = function ( modelView, viewValue ) {
          var def = $q.defer();
          p.then( function () {
            $log.log( 'cityCheck link function called with modelView: ', modelView );
            $log.log( 'cities: ', cities );
            if ( cities.indexOf( modelView ) > -1 ) {
              $log.log( 'cityCheck resolved' );
              def.resolve();
            } else {
              $log.log( 'cityCheck rejected' );
              def.reject();
            }
          } );

          p.catch( function () {
            def.reject();
          } );

          return def.promise;
        };
      }
    }
  } );

  mod.directive( 'limitDate', function ( $log ) {
    var lowDate  = new Date( '2015-01-01' ),
        highDate = new Date();
    return {
      restrict : 'A',
      require  : 'ngModel',
      link     : function ( scope, element, attrs, modelCtrl ) {
        if ( modelCtrl ) {
          modelCtrl.$validators.date = function ( modelValue, viewValue ) {
            //$log.log( 'modelValue: ', modelValue );
            //$log.log( 'viewValue: ', viewValue );

            return !!(modelValue >= lowDate && modelValue <= highDate);

          };
        }
      }
    }

  } );
})( angular );