(function ( angular ) {
  angular.module( 'optionsApp', [] )
    .controller( 'OptionsCtrl', function ( $scope, $log ) {
      $log.log( 'Successful setup!' );
      $scope.names = ['John', 'Dan', 'Tim', 'Andre', 'Angela', 'Maria',
        'Andres', 'Chuck', 'Joseph', 'Jose'];
    } );

})( angular );


