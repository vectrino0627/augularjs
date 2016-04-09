describe( 'Testing highlight-match.js', function () {
  var testScope;

  describe( 'Testing HighlightCtrl', function () {
    beforeEach( function () {
      module( 'highlightApp' );
      inject(function($controller, $rootScope) {
        testScope = $rootScope.$new();
        $controller( 'HighlightCtrl', {
          $scope : testScope
        } );
      });
    } );

    describe( 'addName()', function () {
      it( 'should add a name to the array',
        function () {
          var namesCount = testScope.names.length;
          var addedName = 'Fred';
          testScope.addName( addedName );
          expect( testScope.names.length ).toBe( namesCount + 1 );
          expect( testScope.names.indexOf( addedName ) ).toBeGreaterThan( -1 );
        } );

      it( 'should not add a duplicate to the array',
        function () {
          var originalCount = testScope.names.length;
          var addedName = testScope.names[0];
          testScope.addName( addedName );
          expect( testScope.names.indexOf( addedName ) ).not.toBe( -1 );
          expect( testScope.names.length ).toBe( originalCount );
        } );
    } );

    describe( 'nameFound()', function () {
      it( 'should match a needle in a haystack', function () {
        var haystack = testScope.names[0];
        var needle = haystack.substr( 1 );
        expect( testScope.nameFound( needle, haystack ) ).toBeTruthy();
      } );

      it( 'should not find a match', function () {
        var haystack = 'Jonathan';
        var needle = 'foo';
        expect( testScope.nameFound( needle, haystack ) ).toBeFalsy();

      } )
    } );
  } );
} );
