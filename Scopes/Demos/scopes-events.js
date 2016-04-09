(function ( angular ) {
  angular.module( 'scopeViews', [] )
    .controller( 'ParentCtrl', ['$scope', '$log', function ( $scope, $log ) {
      $scope.scopeName = 'ParentScope';

      $scope.sbc = function ( msg ) {
        $log.log( 'Called $scope.sbc()' );
        $scope.$broadcast( 'general', msg );
      };

      $scope.$on( 'grandchild', function ( evt, msg ) {
        $log.log( 'ParentCtrl: Captured \'grandchild\' event with message: %s', msg );
        $log.log( 'Event object: ', evt );
      } );

    }] )
    .controller( 'Child1Ctrl', ['$scope', '$log', function ( $scope, $log ) {
      $scope.scopeName = 'Child1Scope';
      $scope.$on( 'general', function ( evt, msg ) {
        $log.log( 'Child1Ctrl: received broadcast event "general" with message: %s', msg );
        $log.log( 'Event object: ', evt );
      } );
    }] )
    .controller( 'Child2Ctrl', ['$scope', '$log', function ( $scope, $log ) {
      $scope.scopeName = 'Child2Scope';
      $scope.$on( 'grandchild', function ( evt, msg ) {
        $log.log( 'Child2Ctrl: Captured \'grandchild\' event with message: %s', msg );
      } );
    }] )
    .controller( 'GrandchildCtrl', ['$scope', function ( $scope ) {
      $scope.scopeName = 'GrandchildScope';
      $scope.sEmit = function ( msg ) {
        $scope.$emit( 'grandchild', msg );
      };
    }] );

})( angular );
