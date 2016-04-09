(function ( angular ) {

  var mod = angular.module( 'highlightApp', [] );

  mod.controller( 'HighlightCtrl', function ( $scope, $log ) {
      $scope.names = ['John', 'Dan', 'Tim', 'Andre', 'Angela', 'Maria', 'Andres', 'Chuck', 'Joseph', 'Jose'];

      $scope.addName = function ( addedName ) {
        $log.log( 'Called addName()' );
        if ( addedName && $scope.names.indexOf( addedName ) === -1 ) {
          $scope.names.push( addedName );
        }
      };

      $scope.nameFound = function ( searchName, thisName ) {
        if ( searchName ) {
          return thisName.toUpperCase().indexOf( searchName.toUpperCase() ) + 1;
        }
      };

    }
  );

})( angular );
