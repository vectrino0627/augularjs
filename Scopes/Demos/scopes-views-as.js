(function ( angular ) {
  angular.module( 'scopeViews', [] )
    .controller( 'ParentCtrl', ['$scope', function () {
      var vm = this;

      vm.scopeName = 'ParentScope';
      vm.foo = 'Foo';
    }] )
    .controller( 'Child1Ctrl', ['$scope', function () {
      var vm = this;
      vm.scopeName = 'Child1Scope';
    }] )
    .controller( 'Child2Ctrl', ['$scope', function () {
      var vm = this;
      vm.scopeName = 'Child2Scope';
    }] )
    .controller( 'GrandchildCtrl', ['$scope', function () {
      var vm = this;
      vm.scopeName = 'GrandchildScope';
    }] );

})( angular );
