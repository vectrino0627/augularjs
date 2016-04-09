describe( 'Testing providers.js', function () {
  describe( 'No mocks at all', function () {
    var testFactory;

    beforeEach( function () {
      module( 'providerApp' );
      inject( function ( _testFactory_ ) {
        testFactory = _testFactory_;
      } );
    } );

    it( 'should return \'testFactory\'', function () {
      expect( testFactory.getIdentity() ).toBe( 'testFactory' );
    } )
  } );

  describe( 'Mocking using Angular', function () {
    var testFactory;

    beforeEach( function () {
      module( 'providerApp' );
      module( function ( $provide ) {
        $provide.factory( 'dep1', function ( $log ) {
          $log.log( 'Mocked dep1' );

          return {
            getIdentity : function () {
              return 'dep1 mocked by Angular';
            }
          }
        } );

      } );
      inject( function ( _testFactory_ ) {
        testFactory = _testFactory_;

      } );
    } );

    it( 'should return \'testFactory\'', function () {
      expect( testFactory.getIdentity() ).toBe( 'testFactory' );
    } );

    it( 'should return the mocked version of testFactory.getDep1Identity()',
      function () {
        expect( testFactory.getDep1Identity() ).toBe( 'dep1 mocked by Angular' );
      } );
  } );

  describe( 'Mocking using Jasmine', function () {
    var testFactory, dep1Mock;
    beforeEach( function () {
      module( 'providerApp' );
      module( function ( $provide ) {
        dep1Mock = {
          getIdentity : jasmine.createSpy().and.returnValue( 'dep1 mocked by Jasmine' )
        };

        $provide.factory( 'dep1', function ( $log ) {
          $log.log( 'Jasmine-mocked dep1' );

          return dep1Mock;
        } );
      } );
      inject( function ( _testFactory_ ) {
        testFactory = _testFactory_;

      } );
    } );

    it( 'should return \'testFactory\'', function () {
      expect( testFactory.getIdentity() ).toBe( 'testFactory' );
    } );

    it( 'should return the mocked version of testFactory.getDep1Identity()',
      function () {
        expect( testFactory.getDep1Identity() ).toBe( 'dep1 mocked by Jasmine' );
      } );

  } )
} );
