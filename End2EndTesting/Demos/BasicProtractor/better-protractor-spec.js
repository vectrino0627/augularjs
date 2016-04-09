describe( 'Testing highlight-match.html', function () {

  var URL = 'http://localhost:8000/IntroAngular/Demos/highlight-match.html';

  describe( 'Testing add name', function () {
    var originalCount, nameList;

    beforeEach( function () {
      browser.get( URL );
      nameList = element.all( by.repeater( 'personName in names' ) );

      nameList.then( function ( names ) {
        originalCount = names.length;
      } );
    } );

    it( 'should add a name', function () {
      element( by.model( 'newName' ) ).sendKeys( 'Fred' );
      element( by.buttonText( 'Add name!' ) ).click();
      var currentCount = nameList.count();

      expect( originalCount ).toBeGreaterThan( 0 );
      expect( currentCount ).toBeGreaterThan( originalCount );
      expect( currentCount ).toBe( originalCount + 1 );
    } );

    it( 'should not add a duplicate', function () {
      var existingName = nameList.first().getText();
      element( by.model( 'newName' ) ).sendKeys( existingName );
      element( by.buttonText( 'Add name!' ) ).click();
      var currentCount = nameList.count();

      expect( currentCount ).toBe( originalCount );
    } );
  } );

  describe( 'Testing highlighting matches', function () {
    beforeEach( function () {
      browser.get( URL );
    } );

    it( 'should highlight a match', function () {
      element( by.model( 'fName' ) ).sendKeys( 'an' );
      element.all( by.className( 'highlight' ) ).then( function ( highlighted ) {
        expect( highlighted.length ).toBe( 4 );
      } )

    } );
  } );
} );

