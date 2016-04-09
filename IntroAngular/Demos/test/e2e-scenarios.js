describe( 'Initial test', function () {
  beforeEach( function () {
    browser().navigateTo( '../highlight-match.html' );
  } );

  it( 'should find 10 list items.', function () {
    expect( repeater( 'ul li' ).count() ).toBe( 10 );
  } );

  it( 'should add a new name.', function () {
    input( 'newName' ).enter( 'Fred' );
    element( 'button' ).click();
    expect( repeater( 'ul li' ).count() ).toBe( 11 );
  } );

  it( 'should highlight names with the letter "o" in them.', function () {
    input( 'fName' ).enter( 'o' );
    expect( element( 'li > span.highlight' ).count() ).toBe( 3 );
  } )
} );
