(function ( angular ) {
  var mod = angular.module( 'orderApp', [] );

  mod.controller( 'OrderCtrl', function ( $scope ) {
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

    // Convenience for getting the possible sort keys
    $scope.propNames = Object.keys( $scope.people[0] );

    // Set the default sort
    $scope.sortField = 'name';

  } );
})( angular );
