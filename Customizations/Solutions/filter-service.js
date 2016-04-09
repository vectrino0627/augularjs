(function ( angular ) {
  angular.module( 'filterApp', [] )
    .controller( 'StateStatusCtrl', ['$scope', function ( $scope ) {

      $scope.$on( 'selectedState', function ( event, state ) {
        $scope.selectedState = state;
      } );

    }] )
    .controller( 'StateDetailCtrl', ['$scope', function ( $scope ) {

      $scope.$on( 'selectedState', function ( event, state ) {
        $scope.selectedState = state;
      } );

      $scope.nextPrev = function ( state, dir ) {
        $scope.$emit( 'nextState', state, dir );
      }

    }] )
    .controller( 'StateSearchCtrl', ['$scope',
      function ( $scope ) {
        $scope.changeSearch = function ( filterObj ) {
          $scope.$emit( 'filterStates', filterObj );
        }

      }] )
    .controller( 'StateListCtrl', ['$scope', '$log', function ( $scope, $log ) {
      $log.log( 'StateListCtrl will do something, eventually.' );
    }] )
    .controller( 'StateCtrl', ['$scope', '$log', '$http', 'filterFilter',
      function ( $scope, $log, $http, filterFilter ) {

        var originalStates = [];

        /*
         * As you can see, we are currently using Angular's standard filter Filter.
         * Change this as follows:
         * State names should change from checking to see if the state name contains
         * the filter value to whether the state name starts with the filter value
         *
         * Population should be filtered by whether the state's value is greater
         * than that provided by the filter (state.population > fobj.population)
         *
         * Challenge: The rest of the filter values should work normally
         */

        $scope.$on( 'filterStates', function ( evt, fobj ) {
          $scope.states = filterFilter( originalStates, function ( state ) {
            for ( var prop in state ) {
              if ( fobj[prop] ) {

                switch ( prop ) {
                  case 'name':
                    if ( !(state[prop].toUpperCase().indexOf( fobj[prop].toUpperCase() ) === 0 ) ) {
                      return false;
                    }
                    break;
                  case 'population':
                  case 'squareMiles':
                    if ( state[prop] < fobj[prop] ) {
                      return false;
                    }
                    break;
                  default:
                    if ( state[prop].toUpperCase().indexOf( fobj[prop].toUpperCase() ) === -1 ) {
                      return false;
                    }
                }
              }
            }
            return true;
          } );
        } );

        var p = $http( {
          method : 'get',
          url    : 'http://localhost:8001/states/'
        } );

        p.then( function ( retObj ) {
          $scope.states = retObj.data;
          originalStates = retObj.data;
        } );

        $scope.selectState = function ( event ) {

          var searchState = event.target.innerHTML;
          var selectedState = filterFilter( $scope.states, { name : searchState } )[0];
          $scope.$broadcast( 'selectedState', selectedState );
        };

        $scope.$on( 'nextState', function ( event, state, dir ) {
          var nextPos = Math.min( Math.max( ($scope.states.indexOf( state ) + dir), 0 ),
            $scope.states.length );
          $scope.$broadcast( 'selectedState', $scope.states[nextPos] );
        } );
      }] );

})( angular );
