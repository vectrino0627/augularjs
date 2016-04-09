(function ( angular ) {
  var mod = angular.module( 'scopeViews', [] );

  mod.controller( 'GrandchildCtrl', ['$scope', function ( $scope ) {
    $scope.scopeName = 'GrandchildScope';
  }] );

  mod.controller( 'Child1Ctrl', ['$scope', function ( $scope ) {
    $scope.scopeName = 'Child1Scope';
  }] );

  mod.controller( 'ParentCtrl', ['$scope', function ( $scope ) {
    $scope.scopeName = 'ParentScope';
    $scope.foo = 'Foo';
  }] );

  mod.controller( 'Child2Ctrl', ['$scope', function ( $scope ) {
    $scope.scopeName = 'Child2Scope';
  }] );


})( angular );

