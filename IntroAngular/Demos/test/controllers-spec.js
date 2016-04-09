describe( 'Testing examples', function () {

  it( 'should pass a basic test (5 === 5)', function () {
    expect( 5 ).toBe( 5 );
  } );

  describe( 'IntroApp Controllers', function () {
    var testScope, controllerLookupService;

    beforeEach( function () {
      module( 'introApp' );
      inject( function ( $controller, $rootScope ) {
        controllerLookupService = $controller;
        testScope = $rootScope.$new();
      } );
    } );

    describe( 'Testing FirstCtrl', function () {

      it( 'should have 10 elements in the names array',
        // Inject the controller service:
        function () {

          // Use the controller lookup service to inject a reference to the foo
          // object as $scope, connecting $scope (available only inside the
          // controller) to foo, available here.
          controllerLookupService( 'FirstCtrl', {
            $scope : testScope
          } );

          expect( testScope.names.length ).toBe( 10 );
        } )
    } );

    describe( 'Testing AddNameCtrl', function () {
      it( 'should add a name to the array',
        function () {
          controllerLookupService( 'AddNameCtrl', {
            $scope : testScope,
            $log   : console
          } );

          var namesCount = testScope.names.length;
          var addedName = 'Fred';
          testScope.addName( addedName );
          expect( testScope.names.length ).toBe( namesCount + 1 );
          expect( testScope.names.indexOf( addedName ) ).toBeGreaterThan( -1 );
        } );

      it( 'should not add a duplicate to the array',
        function () {
          controllerLookupService( 'AddNameCtrl', { $scope : testScope } );
          var idx = 0;

          var originalCount = testScope.names.length;
          var addedName = testScope.names[idx];
          testScope.addName( addedName );
          expect( testScope.names.indexOf( addedName, idx + 1 ) ).toBe( -1 );
          expect( testScope.names.length ).toBe( originalCount );
        } );
    } );
  } );
} );
