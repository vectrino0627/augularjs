describe( 'Testing highlight-match.html', function () {

  var URL = 'End2EndTesting/Demos/Promises/highlight-match.html';

  describe( 'Testing add name', function () {
    beforeEach( function () {
      browser.get( URL );
    } );

    it( 'should have 10 elements (via then)', function () {
      var originalCount = 0;

      // This will retrieve elements until an "action" is requested
      element.all( by.repeater( 'personName in names' ) )
        .then( function ( namesList ) {
          originalCount = namesList.length;
          expect( originalCount ).toBe( 10 );
        } );

    } );

    it( 'should have 10 elements (via actions)', function () {
      var originalCount = 0;

      // This will retrieve elements because of the "action" of calling count()
      originalCount = element.all( by.repeater( 'personName in names' ) ).count();
      expect( originalCount ).toBe( 10 );

    } );

    it( 'should perform a simple chain of actions', function () {

      // This provokes an "action" (get(0) in this case)
      var firstElement = element.all( by.repeater( 'personName in names' ) ).get( 0 );

      // The call to getText() is another action in sequence
      expect( firstElement.getText() ).toEqual( 'John' );
    } );

    it( 'should perform a more complex chain of actions', function () {
      var filterField = element( by.model( 'fName' ) );
      filterField.sendKeys( 'an' );
      var highlightedCount = element.all(by.css('.highlight') ).count();
      expect( highlightedCount ).toBe( 4 );

    } );
  } );

} );

