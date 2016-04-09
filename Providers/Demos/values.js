(function ( angular ) {
  var mod = angular.module( 'valuesApp', [] );

  /*
   * Could be an object, string, array, instance of a type, etc.
   * Cannot depend on other providers
   * Cannot be initialized by a function
   * Is really rather static
   */
  mod.value( 'authorName', 'John Paxton' );
  mod.value( 'publishInfo', {
    yearPublished : 1999
  } );

  mod.controller( 'MainCtrl', ['$scope', 'authorName', 'publishInfo',
    function ( $scope, authorName, publishInfo ) {
      // Reset the authorName and yearPublished locally,
      // but it has no effect otherwise, or externally (to this controller)
      authorName = 'Herman Melville';
      $scope.authorName = authorName;
      $scope.pYear = publishInfo.yearPublished;
      publishInfo.yearPublished = 2000;

    }] );

  mod.controller( 'OtherCtrl', ['$scope', 'authorName', 'publishInfo',
    function ( $scope, authorName, publishInfo ) {
      $scope.authorName = authorName;
      $scope.pYear = publishInfo.yearPublished;
    }] );

})( angular );
