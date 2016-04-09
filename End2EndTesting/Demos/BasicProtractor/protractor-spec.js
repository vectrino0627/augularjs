describe( 'Initial test', function () {
  it('should have a title', function() {
    browser.get('http://localhost:8000/IntroAngular/Demos/highlight-match.html');

    expect( browser.getTitle() ).toEqual( 'Highlighting matches' );
  })
});
