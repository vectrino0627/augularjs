(function ( angular ) {
  var mod = angular.module( 'highlightApp', [] );

  mod.controller( 'HighlightCtrl', function ( $scope, $log ) {
      $scope.names = ['John', 'Dan', 'Tim', 'Andre', 'Angela', 'Maria', 'Andres', 'Chuck', 'Joseph',
        'Jose'];

      $scope.addName = function ( addedName ) {
        $log.log( 'Called addName()' );
        if ( addedName && $scope.names.indexOf( addedName ) === -1 ) {
          $scope.names.push( addedName );
        }
      };

      $scope.nameFound = function ( searchName, thisName ) {
        if ( searchName ) {
          return thisName.indexOf( searchName ) + 1;
        }
      };

      $scope.checkFound = function ( personName, fName ) {
        return fName && personName.toUpperCase().indexOf( fName.toUpperCase() ) > -1;
      };

      $scope.getClass = function ( personName, fName ) {
        if ( fName && personName.toUpperCase().indexOf( fName.toUpperCase() ) > -1 ) {
          return 'highlight';
        }
      }

    }
  );

})( angular );
