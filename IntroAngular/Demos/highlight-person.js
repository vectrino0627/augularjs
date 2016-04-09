(function ( angular ) {
  var mod = angular.module( 'addNameApp', [] );

  mod.controller( 'AddNameCtrl', function ( $scope, $log, filterFilter ) {
    $scope.people = [
      { name : 'John', gender : 'male', age : 40, id : '101' },
      { name : 'Dan', gender : 'male', age : 35, id : '102' },
      { name : 'Tim', gender : 'male', age : 32, id : '103' },
      { name : 'Andre', gender : 'female', age : 38, id : '104' },
      { name : 'Angela', gender : 'female', age : 44, id : '105' },
      { name : 'Maria', gender : 'female', age : 36, id : '106' },
      { name : 'Andres', gender : 'male', age : 33, id : '107' },
      { name : 'Chuck', gender : 'male', age : 38, id : '108' },
      { name : 'Joseph', gender : 'male', age : 28, id : '109' },
      { name : 'Jose', gender : 'male', age : 25, id : '110' }
    ];

    $scope.addPerson = function ( personIn ) {

      var results = filterFilter( $scope.people, personIn ) || [];

      if ( results.length === 0 ) {
        $scope.people.push( angular.copy( personIn ) );
      } else {
        $log.log( 'The person is a duplicate. Not added.' );
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
  } );

})( angular );
