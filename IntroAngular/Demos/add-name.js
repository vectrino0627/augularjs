(function ( angular ) {
  var mod = angular.module( 'addNameApp', [] );

  // Remember that we can depend on any filter by asking for
  // <filterName>Filter
  mod.controller( 'AddNameCtrl', function ( $scope, $log, filterFilter ) {
    $scope.people = [
      { name : 'John',   gender : 'male',   age : 40, id : '101' },
      { name : 'Dan',    gender : 'male',   age : 35, id : '102' },
      { name : 'Tim',    gender : 'male',   age : 32, id : '103' },
      { name : 'Andre',  gender : 'female', age : 38, id : '104' },
      { name : 'Angela', gender : 'female', age : 44, id : '105' },
      { name : 'Maria',  gender : 'female', age : 36, id : '106' },
      { name : 'Andres', gender : 'male',   age : 33, id : '107' },
      { name : 'Chuck',  gender : 'male',   age : 38, id : '108' },
      { name : 'Joseph', gender : 'male',   age : 28, id : '109' },
      { name : 'Jose',   gender : 'male',   age : 25, id : '110' }
    ];

    // This function is available throughout the
    // part of the page governed by this controller
    $scope.addPerson = function ( personIn ) {

      var results = [];
      results = filterFilter( $scope.people, personIn );

      if ( results.length === 0 ) {
        // We want a copy of the object, not a single reference to it
        $scope.people.push( angular.copy( personIn ) );

        // Try using this as an alternative and see what happens!
        //$scope.people.push( personIn );
      } else {
        $log.log( 'The person is a duplicate. Not added.' );
      }
    }
  } );
})( angular );
