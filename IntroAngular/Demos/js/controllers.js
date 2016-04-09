(function ( angular ) {

// We'll go over what's going on here in detail later on
// For now, we're creating a namespace for the application: introApp
  var introApp = angular.module( 'introApp', [] );

// Then we're adding a controller.
  introApp.controller( 'FirstCtrl', function ( $scope, $log ) {
      $scope.names = ['John', 'Dan', 'Tim', 'Andre', 'Angela', 'Maria', 'Andres', 'Chuck', 'Joseph', 'Jose'];
      $log.log( $scope );
    }
  );

// Controller for add-name.html
  introApp.controller( 'AddNameCtrl', function ( $scope, $log ) {
    $scope.names = ['John', 'Dan', 'Tim', 'Andre', 'Angela',
      'Maria', 'Andres', 'Chuck', 'Joseph', 'Jose'];

    // This function is available throughout the
    // part of the page governed by this controller
    $scope.addName = function ( addedName, event ) {
      $log.log( 'Called addName()' );
      $log.log( event );
      // Don't add blanks, and don't try to add repeats
      if ( addedName && $scope.names.indexOf( addedName ) === -1 ) {
        $scope.names.push( addedName );
        $scope.newName = '';
      }
    }
  } );

// Controller for add-name-duplicates.html
// Allows adding of duplicate names thanks to 'track by $index' in ng-repeat
  introApp.controller( 'AddNameDupesCtrl', function ( $scope, $log ) {
    $scope.names = ['John', 'Dan', 'Tim', 'Andre', 'Angela', 'Maria', 'Andres', 'Chuck', 'Joseph', 'Jose'];

    $scope.addName = function ( addedName ) {
      $log.log( 'Called addName()' );
      if ( addedName ) {
        $scope.names.push( addedName );
      }
    }
  } );

// Controller for highlight-match.html
  introApp.controller( 'HighlightCtrl', function ( $scope, $log ) {
      $scope.names = ['John', 'Dan', 'Tim', 'Andre', 'Angela', 'Maria', 'Andres', 'Chuck', 'Joseph', 'Jose'];

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

      $scope.getClass = function(personName, fName) {
        if (fName && personName.toUpperCase().indexOf( fName.toUpperCase() ) > -1) {
          return 'highlight';
        }
      }

    }
  );

})( angular );
