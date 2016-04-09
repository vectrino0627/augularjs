(function(angular) {
  var mod = angular.module( 'transcludeDemo', [] );
  mod.controller( 'MainCtrl', function ( $scope ) {

  } );

  mod.directive('tcExample', function() {
    return {
      transclude: true,
      template: '<span>New text!</span> Original text: [<span ng-transclude></span>]'
    }
  });

})(angular);