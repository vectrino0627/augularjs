(function ( angular ) {
  var introApp = angular.module( 'introApp', [] );

// Then we're adding a controller.
  introApp.controller( 'FirstCtrl', function ( $scope ) {
      $scope.reverseChk = true;
      $scope.people = [
        { name : 'John', gender : 'male', age : 40 },
        { name : 'Dan', gender : 'male', age : 35 },
        { name : 'Tim', gender : 'male', age : 32 },
        { name : 'Andre', gender : 'female', age : 38 },
        { name : 'Angela', gender : 'female', age : 44 },
        { name : 'Maria', gender : 'female', age : 36 },
        { name : 'Andres', gender : 'male', age : 33 },
        { name : 'Chuck', gender : 'male', age : 38 },
        { name : 'Joseph', gender : 'male', age : 28 },
        { name : 'Jose', gender : 'male', age : 25 }
      ];

      // Convenience for getting the possible sort keys
      $scope.propNames = Object.keys( $scope.people[0] );

      // Set the default sort
      $scope.sortField = 'name';
    }
  );

// Controller for add-name.html
  introApp.controller( 'AddNameCtrl', function ( $scope, $log ) {
    $scope.names = ['John', 'Dan', 'Tim', 'Andre', 'Angela', 'Maria', 'Andres', 'Chuck', 'Joseph',
      'Jose'];

    // This function is available throughout the page/view
    $scope.addName = function ( addedName ) {
      $log.log( 'Called addName()' );
      // Don't add blanks, and don't try to add repeats
      if ( addedName && $scope.names.indexOf( addedName ) === -1 ) {
        $scope.names.push( addedName );
      }
    }
  } );

// Controller for highlight-match.html
  introApp.controller( 'HighlightCtrl', function ( $scope, $log ) {
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
      }
    }
  );

})( angular );
