(function ( angular ) {
  var customFiltersModule = angular.module( 'customFilters', [] );
  customFiltersModule.filter( 'betterThan', function () {
    return function ( inputArray, comparisonValue, minWins ) {

      // Set default values
      if ( !comparisonValue ) {
        comparisonValue = 0.5;
      }

      if ( !minWins ) {
        minWins = 85;
      }

      // Cast to numbers, just to be sure
      comparisonValue = Number( comparisonValue );
      minWins = Number( minWins );

      var out = [];

      for ( var x = 0; x < inputArray.length; x++ ) {
        var pct = Number( inputArray[x].win_percentage );
        var wins = Number( inputArray[x].won );
        if ( pct >= comparisonValue && wins >= minWins ) {
          out.push( inputArray[x] );
        }
      }

      return out;
    }
  } );

})( angular );
