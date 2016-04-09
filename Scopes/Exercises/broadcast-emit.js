(function ( angular ) {

  /*
   * In this module, we have three controllers:
   * MainCtrl: Where the data is stored ($scope.states) and the parent of the
   *           next two controllers. Also the home to the list view of the
   *           states
   * StatusCtrl: Just a status bar of sorts
   * DetailCtrl: The item view for the states
   *
   * Part 1:
   * When the user clicks on a state, the status view and the detail view are
   * sent the details of the state clicked on and update accordingly. Rather
   * than tying the views together tightly, we use the controller to mediate their
   * interactions.
   *
   * Clicking on a state in MainCtrl fires selectState(). This function should
   * broadcast an event, 'selectedState' with the state selected as an argument
   *
   * StatusCtrl should listen for the selectedState event and update the value of
   * $scope.selectedState to be the selected state
   *
   * DetailCtrl should listen for the selectedState event and should update the
   * value of $scope.selectedState to be the selected state
   *
   * Part 2 (Activating the buttons):
   * When the $scope.nextPrev event handler fires in DetailCtrl, emit up the
   * $scope stack an event, 'nextState' communicating the current state, and the
   * direction to go in (1 or -1)
   *
   * In MainCtrl, listen for the 'nextState' event, figure out what the next or
   * previous state should be and then broadcast that as a selectedState event.
   *
   */

  angular.module( 'eventApp', [] )
    .controller( 'StatusCtrl', ['$scope', function ( $scope ) {

      // Listen for the selectedState event here
      // When it occurs, set $scope.selectedState to the state that is passed
      // as part of the event

    }] )
    .controller( 'DetailCtrl', ['$scope', function ( $scope ) {

      // Listen for the selectedState event here as well
      // When it occurs, set $scope.selectedState to the state that is passed
      // as part of the event

      $scope.nextPrev = function ( currentState, dir ) {
        // Emit the nextState event here

      }

    }] )
    .controller( 'MainCtrl', ['$scope', '$log', '$http', function ( $scope, $log, $http ) {

      // Write the event handler for selectState
      // Use it to broadcast the state which has been selected

      // Listen for the 'nextState' event, figure out what the next or previous
      // state should be and broadcast that as another 'selectedState' event


      $http.get( '/data/states.json' )
        .then( function ( retObj ) {
          $scope.states = retObj.data;
        } )

    }] );
})( angular );
