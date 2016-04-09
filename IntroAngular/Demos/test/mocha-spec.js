describe( 'Testing examples', function () {
  // chai asserts: http://chaijs.com/api/assert/
  it( 'chai.assert: should pass a basic test (5 === 5)',
    function () {
      assert.strictEqual( 5, 5, 'these numbers are strictly equal' );
      assert.notStrictEqual( 5, '5', 'Strings and Numbers can never be strictly equal' );
    } );

  // chai expect/bdd: http://chaijs.com/api/bdd/
  it( 'chai.expect: should pass a basic test (5 === 5)', function () {
    expect( 5 ).to.equal( 5 );
    expect( 5 ).not.to.equal( '5' );
  } );

  // chai should/bdd:
  it( 'chai.should: should pass a basic test (\'5\' === \'5\')',
    function () {
      var five = '5';
      five.should.be.a( 'string' );
      five.should.equal( '5' );
      five.should.not.equal( 5 );
    } );

  describe( 'IntroApp Controllers', function () {

    var testScope, controller;

    beforeEach( function () {
      module( 'introApp' );
      inject( function ( $controller, $rootScope ) {
        controller = $controller;
        testScope = $rootScope.$new();
      } );
    } );

    describe( 'expect: Testing FirstCtrl', function () {

      it( 'expect: should have 10 elements in the names array',
        // Inject the controller service: https://code.angularjs.org/1.2.23/docs/api/ng/service/$controller
        function () {

          // Use the controller lookup service to inject a reference to the foo
          // object as $scope, connecting $scope (available only inside the controller)
          // to foo, available here.
          controller( 'FirstCtrl', { $scope : testScope } );

          expect( testScope.names.length ).to.equal( 10 );

        } )
    } );

    describe( 'should: Testing FirstCtrl', function () {

      it( 'should: have 10 elements in the names array',
        // Inject the controller service: https://code.angularjs.org/1.2.23/docs/api/ng/service/$controller
        function () {

          // Use the controller lookup service to inject a reference to the foo
          // object as $scope, connecting $scope (available only inside the controller)
          // to foo, available here.
          controller( 'FirstCtrl', { $scope : testScope } );

          testScope.names.should.have.length( 10 );

        } )
    } );

    describe( 'expect: Testing AddNameCtrl', function () {
      it( 'expect: add a name to the array',
        function () {
          controller( 'AddNameCtrl', { $scope : testScope } );

          var namesCount = testScope.names.length;
          var addedName = 'Fred';
          testScope.addName( addedName );
          expect( testScope.names.length ).to.equal( namesCount + 1 );
          expect( testScope.names.indexOf( addedName ) ).to.be.above( -1 );
        } );

      it( 'expect: not add a duplicate to the array',
        function () {
          controller( 'AddNameCtrl', { $scope : testScope } );

          var originalCount = testScope.names.length;
          var addedName = testScope.names[2];
          testScope.addName( addedName );
          expect( testScope.names.indexOf( addedName ) ).not.to.equal( -1 );
          expect( testScope.names.length ).to.equal( originalCount );
        } );
    } );

    describe( 'should: Testing AddNameCtrl', function () {
      it( 'should: add a name to the array',
        function () {
          controller( 'AddNameCtrl', { $scope : testScope } );

          var namesCount = testScope.names.length;
          var addedName = 'Fred';
          testScope.addName( addedName );
          testScope.names.should.have.length( namesCount + 1 );
          testScope.names.indexOf( addedName ).should.be.above( -1 );
        } );

      it( 'should: not add a duplicate to the array',
        function () {
          controller( 'AddNameCtrl', { $scope : testScope } );

          var originalCount = testScope.names.length;
          var addedName = testScope.names[2];
          testScope.addName( addedName );
          testScope.names.indexOf( addedName ).should.not.equal( -1 );
          testScope.names.should.have.length( originalCount );
        } );
    } );
  } );
} );
