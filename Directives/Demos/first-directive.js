(function ( angular ) {
  var dirApp = angular.module( 'dirApp', [] );

  dirApp.directive( 'basicAttr', function () {
    return {
      template : 'A basic attribute directive',
      restrict : 'A'
    };
  } );

  dirApp.directive( 'basicTag', function () {
    return {
      template : 'A basic tag directive',
      restrict : 'E'
    }
  } );

  dirApp.directive( 'templateTag', function () {
    return {
      templateUrl : 'partials/template-directive.html',
      restrict    : 'E'
    }
  } );

  dirApp.controller( 'DirCtrl', ['$scope',
    function ( $scope, $log ) {
      $log.log( 'This controller doesn\'t do very much at the moment.' );

      $scope.author = 'John Paxton'
    }] );

})( angular );
