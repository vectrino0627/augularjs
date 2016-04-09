(function ( angular ) {
  // Include a dependency on ngResource
  var mod = angular.module( 'customerApp', ['ngResource', 'ngMessages'] );
  mod.controller( 'CustomerCtrl',
    // Include a dependency on $resource
    function ( $scope, $log, $document, $resource ) {

      /*
       * Create a resource with the following configuration
       * The url is http://localhost:8001/northwind/customers/:customerID
       * It accepts customerIDs as a parameter, usually passed as 'id'
       * Assign the result to Customer
       */
      var Customer = $resource( 'http://localhost:8001/northwind/customers/:customerID',
        { customerID : '@id' } );

      $document.ready( function () {
        $scope.$watch( 'dbobj.contactName || dbobj.companyName', function () {
          $log.log( 'dbobj was updated' );
          // Use the Customer resource to query using dbobj
          $scope.customers = Customer.query( $scope.dbobj );
        } );

      } );

      // Get all the customers using the Customer resource
      $scope.customers = Customer.query();

      // We'll implement these soon!
      //$scope.cities = customerDAO.getCities();
      //$scope.countries = customerDAO.getCountries();

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

      // We will bring these back soon!
      /*      $scope.limitCities = function ( country ) {
       if ( !country ) {
       $scope.cities = customerDAO.getCities();
       delete $scope.fobj.country;
       } else {
       $scope.cities = customerDAO.getCitiesByCountry( country );
       }

       $scope.fobj.city = '';
       };*/

    } );

  /*  mod.directive( 'checkCountry', function ( customerDAO ) {
   var countries = customerDAO.getCountries();

   return {
   restrict : 'A',
   require  : 'ngModel',
   link     : function ( scope, element, attrs, modelCtrl ) {
   modelCtrl.$validators.checkCountry = function ( modelValue ) {
   return countries.indexOf( modelValue ) > -1;
   }
   }
   }
   } );*/

  mod.directive( 'idCheck', function ( $http, $q ) {
    var ids = [];

    return {
      restrict : 'A',
      require  : 'ngModel',

      link : function ( scope, element, attrs, modelCtrl ) {
        var originalID;

        // Get the original value of the ID
        element.one( 'focus', function ( evt ) {
          originalID = element.val();
        } );

        modelCtrl.$asyncValidators.idCheck = function ( modelValue ) {
          var def = $q.defer();

          $http( {
            url    : 'http://localhost:8001/northwind/customers/' + modelValue,
            method : 'get'
          } )
            .then( function ( retObj ) {
              var rec = retObj.data;
              if ( !rec ) {
                def.resolve();
              } else {
                if ( rec.customerID === originalID ) {
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
})( angular );