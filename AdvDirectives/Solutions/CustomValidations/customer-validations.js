(function ( angular ) {
  var mod = angular.module( 'customerApp', ['customerServices', 'ngMessages'] );

  /*
   * Create a directive "checkCountry" which uses customerDAO to validate
   * the value of the country field
   */
  mod.directive('checkCountry', function(customerDAO) {
    var countries = customerDAO.getCountries();

    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attrs, modelCtrl) {
        modelCtrl.$validators.checkCountry = function(modelValue) {
          return countries.indexOf(modelValue) > -1;
        }
      }
    }
  });

  /*
   * Create a directive, idCheck. It is an asynchronous check to see if the
   * new value of the customerID field is not already in use.
   * There are a variety of ways to do this, you could use customerDAO
   * (in several different ways), or you could write a custom request to the
   * Northwind RESTful endpoint. Try to get a simple version working before
   * worrying about edge cases.
   */
  mod.directive( 'idCheck', function ( $http, $q) {
    var ids = [];

    return {
      restrict : 'A',
      require  : 'ngModel',

      link : function ( scope, element, attrs, modelCtrl ) {
        var originalID;

        // Get the original value of the ID
        element.one('focus', function(evt) {
          originalID = element.val();
        });

        modelCtrl.$asyncValidators.idCheck = function ( modelValue ) {
          var def = $q.defer();

          $http( {
            url    : 'http://localhost:8001/northwind/customers/' + modelValue,
            method : 'get'
          } )
            .then( function ( retObj ) {
              if ( !retObj.data ) {
                def.resolve();
              } else {
                if (retObj.data.customerID === originalID) {
                  def.resolve();
                }
                def.reject();
              }
            },
            function () {
              def.reject();
            } );
          return def.promise;
        }
      }
    };
  } );

  mod.controller( 'CustomerCtrl',
    function ( $scope, $log, $document, customerDAO ) {
      $scope.customers = customerDAO.getCustomers();
      $scope.cities = customerDAO.getCities();
      $scope.countries = customerDAO.getCountries();

      $scope.showMessage = function ( model ) {
        if ( model && model.$touched && model.$error ) {
          return model.$error
        } else {
          return {
            valid : true
          }
        }
      };

      var usZip = new RegExp( '^\\d{5}(-\\d{4})?$' );
      var ukPostcode = new RegExp( '^[A-Z]{2}\\d \\d[A-Z]{2}$' );
      $scope.postalCodePattern = usZip;

      $scope.postalCodeValidationMessage = '';

      $scope.$watch( 'customer.country', function ( newVal ) {
        switch ( newVal ) {
          case 'USA':
            $scope.postalCodePattern = usZip;
            $scope.postalCodeValidationMessage = 'Please add a five-digit zip code.';
            break;
          case 'UK':
            $scope.postalCodePattern = ukPostcode;
            $scope.postalCodeValidationMessage = 'Please add a proper post code.';
            break;
          default:
            $scope.postalCodePattern = '';
        }
      } );

      $scope.editCustomer = function ( customer ) {
        $scope.customer = customer;
        $scope.customerID = customer.customerID;
      };

      $scope.resetCities = function ( city ) {
        if ( !city ) {
          delete $scope.fobj.city;
        }
      };

      $scope.limitCities = function ( country ) {
        if ( !country ) {
          $scope.cities = customerDAO.getCities();
          delete $scope.fobj.country;
        } else {
          $scope.cities = customerDAO.getCitiesByCountry( country );
        }

        $scope.fobj.city = '';
      };

      $document.ready( function () {
        $scope.$watch( 'dbobj.contactName || dbobj.companyName', function () {
          $log.log( 'dbobj was updated' );
          customerDAO.refresh( $scope.dbobj );
        } );

      } );
    } );
})( angular );