(function ( angular ) {
  var introApp = angular.module( 'introApp', [] );

  introApp.controller( 'FirstCtrl', function ( $scope ) {
      var ctrl = this;
      ctrl.names = ['John', 'Dan', 'Tim', 'Andre', 'Angela', 'Maria', 'Andres', 'Chuck', 'Joseph',
        'Jose'];
      ctrl.foo = 'Controller\'s foo';
      $scope.foo = 'Foo';
    }
  );

})( angular );
