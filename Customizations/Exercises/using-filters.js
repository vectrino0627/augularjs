(function ( angular ) {
  angular.module( 'filterApp', [] )
    /*
     * Build a filter, greaterThan
     * It should take three arguments:
     *    input: an array of objects,
     *    fobj:  an object as filtering input,
     *    fields: a list of fields to filter on
     *
     * Iterate over the input array. For each record in the array, test each
     * field in fields. All of the field values in the filtering object must be
     * less than their corresponding values in each record. That is:
     *
     * input[0].fields[0] > fobj.fields[0] &&
     * input[0].fields[1] > fobj.fields[1] && etc, etc
     *
     * (Consider that it may be easier to fail a record, filtering it out, if any
     * value in the record is less than the corresponding value in the filtering object)
     *
     */

    /*
     * Build a filter, startsWith
     * It should take three arguments:
     *    input: an array of objects,
     *    fobj:  an object as filtering input,
     *    fields: a list of fields to filter on
     *
     * Iterate over the input array. For each record in the array, test each
     * field in fields. All of the field values in each record must
     * start with their corresponding values in the filtering object
     * (case insensitively). That is:
     *
     * input[0].fields[0].startsWith( fobj.fields[0] ) &&
     * input[0].fields[1].startsWith( fobj.fields[1] ) && etc, etc
     *
     * (Consider that it may be easier to fail a record, filtering it out, if any
     * value in the record does not start with the corresponding value in the filtering object)
     *
     */

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
          // Bit of a cheat here. Might be a good use case for controller-as syntax!
          $scope.$parent.filterObj = filterObj;
        };
      }] )
    .controller( 'StateListCtrl', ['$scope', '$log', function ( $scope, $log ) {

    }] )
    .controller( 'StateCtrl', ['$scope', '$log', '$http', 'filterFilter',
      function ( $scope, $log, $http, filterFilter ) {

        var originalStates = [];

        var p = $http( {
          method : 'get',
          url    : 'http://localhost:8001/states/'
        } );

        p.then( function ( retObj ) {
          $scope.states = retObj.data;
          originalStates = retObj.data;
        } );

        $scope.selectState = function ( event ) {

          var searchState = event.target.innerHTML.trim();
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
