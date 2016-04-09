(function ( angular ) {
  var dirApp = angular.module( 'dirApp', [] );

  dirApp.directive( 'transTag', function () {
    return {
      templateUrl : 'partials/trans-tag-tpl.html',
      restrict    : 'E',
      transclude  : true,
      scope       : {
        personName  : '@',
        otherPerson : '@personName'
      }
    }
  } );

  dirApp.controller( 'DirCtrl', ['$scope',
    function ( $scope, $log ) {
      $log.log( 'This controller doesn\'t do very much at the moment.' );
      $scope.otherPerson = 'Bob';
    }] );

})( angular );
