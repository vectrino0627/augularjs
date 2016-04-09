(function ( angular ) {
  var filterApp = angular.module( 'filterApp', [] );

  filterApp.controller( 'FilterCtrl', ['$scope', '$http', '$log',
    function ( $scope, $http, $log ) {

      $http( {
        url    : '/data/baseball-standings.json',
        method : 'get'
      } )
        .then( function ( retObj ) {
          $log.debug( 'Retrieved baseball data!' );
          $scope.teams = retObj.data;
        } );

    }] );

  filterApp.filter( 'betterThan', function () {
    return function ( inputArray, minPct, minWins ) {

      // Set default values
      if ( !minPct ) {
        minPct = 0.5;
      }

      if ( !minWins ) {
        minWins = 81;
      }

      // Cast to numbers, just to be sure
      minPct = Number( minPct );
      minWins = Number( minWins );

      var out = [];

      for ( var x = 0; x < inputArray.length; x++ ) {
        var pct = Number( inputArray[x].win_percentage );
        var wins = Number( inputArray[x].won );
        if ( pct >= minPct && wins >= minWins ) {
          out.push( inputArray[x] );
        }
      }

      return out;
    }
  } );

})( angular );
