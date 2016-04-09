(function ( angular ) {

  var mod = angular.module( 'eventApp', [] );

  mod.controller( 'StatusCtrl', ['$scope', function ( $scope ) {

    $scope.$on( 'selectedState', function ( event, state ) {
      $scope.selectedState = state;
    } );

  }] );

  mod.controller( 'DetailCtrl', ['$scope', function ( $scope ) {

    $scope.$on( 'selectedState', function ( event, state ) {
      $scope.selectedState = state;
    } );

    $scope.nextPrev = function ( state, dir ) {
      $scope.$emit( 'nextState', state, dir );
    }

  }] );

  mod.controller( 'MainCtrl', ['$scope', '$log', '$http', '$cacheFactory', '$filter',
    function ( $scope, $log, $http, $cacheFactory, $filter ) {

      // Create a custom cache, store it in a variable called customCache
      var customCache = $cacheFactory( 'states' );

      /*
       * Make an http request to http://localhost:8001/states/stateNames/
       * If successful, assign the results to $scope.statesShort
       * No need to use a cache here, as we'll do this only onece.
       */
      var p = $http( {
        method : 'get',
        url    : 'http://localhost:8001/states/stateNames/'
      } );

      p.then( function ( retObj ) {
        $scope.statesShort = retObj.data;
      } );

      /*
       * Define a function, getState
       * It should take an argument of a state abbreviation
       * It should use the customCache to store requests
       * It should return a promise
       * It should make a state detail request to
       * http://localhost:8001/states/{state abbrev}
       */
      function getState( stateAb ) {
        return $http( {
          method : 'get',
          url    : 'http://localhost:8001/states/' + stateAb,
          cache  : customCache
        } );

      }

      $scope.selectState = function ( event ) {

        // Angular would probably prefer us not do things this way....
        var searchState = event.target.innerHTML;

        // A shortened version of the previous code, which used Array.some()
        // this uses Angular's filter Filter
        var selectedState = $filter( 'filter' )( $scope.statesShort, { name : searchState } )[0];

        // Invoke getState, passing in the selected state's abbreviation'
        // If the promise is successful, broadcast the data as an argument
        // to the event 'selectedState'
        var pStateDetail = getState( selectedState.abbreviation );
        pStateDetail.then( function ( retObj ) {
          $scope.$broadcast( 'selectedState', retObj.data );

        } );
      };

      $scope.$on( 'nextState', function ( event, state, dir ) {

        var shortState    = $filter( 'filter' )( $scope.statesShort, {
              name         : state.name,
              abbreviation : state.abbreviation,
              _id          : state._id
            } )[0],
            currentPos    = $scope.statesShort.indexOf( shortState ),
            updatedPos    = Math.min( Math.max( currentPos + dir, 0 ),
              $scope.statesShort.length - 1 ),
            nextPrevState = $scope.statesShort[updatedPos];

        // Invoke getState, passing in the next/previous states's abbreviation.
        // If the promise is successful, broadcast the data as an argument to
        // the event 'selectedState'
        var pStateDetail2 = getState( nextPrevState.abbreviation );

        pStateDetail2.then( function ( retObj ) {
          $scope.$broadcast( 'selectedState', retObj.data );

        } );
      } );
    }] );
})( angular );
