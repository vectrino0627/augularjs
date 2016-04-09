angular.module( 'filterMod', [] )
  .filter( 'betterThan', function () {
    return function ( inputArray, compWinPct, minWins ) {

      // Set default values
      if ( !compWinPct ) {
        compWinPct = 0.5;
      }

      if ( !minWins ) {
        minWins = 81;
      }

      // Cast to numbers, just to be sure
      compWinPct = Number( compWinPct );
      minWins = Number( minWins );

      var out = [];

      for ( var x = 0; x < inputArray.length; x++ ) {
        var pct = Number( inputArray[x].win_percentage );
        var wins = Number( inputArray[x].won );
        if ( pct >= compWinPct && wins >= minWins ) {
          out.push( inputArray[x] );
        }
      }

      return out;
    }
  } );