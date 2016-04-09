describe( 'Testing highlight-match.html', function () {

  var URL = 'http://localhost:8000/IntroAngular/Demos/highlight-match-async.html';

  describe( 'Testing add name', function () {
    var originalCount, peopleRep;

    beforeEach( function () {
      browser.get( URL );
      peopleRep = element.all( by.repeater( 'person in people' ) );

      peopleRep.then( function ( people ) {
        originalCount = people.length;
      } );
    } );

    it( 'should add a person', function () {
      element( by.model( 'person.name' ) ).sendKeys( 'Cameron Hodge' );
      element( by.model( 'person.age' ) ).sendKeys( '50' );
      element( by.model( 'person.gender' ) ).sendKeys( 'M' );
      element( by.buttonText( 'Add Person!' ) ).click();
      var currentCount = peopleRep.count();

      expect( currentCount ).toBeGreaterThan( originalCount );
      expect( currentCount ).toBe( originalCount + 1 );
    } );

    it( 'should not add a duplicate', function () {
      var dupPerson = {};
      console.log( peopleRep.first().getText().then(function(results) {
        var tokens = results.split( ' ' );
        dupPerson.gender = tokens[0].indexOf('Ms') > -1 ? 'female' : 'male';
        dupPerson.name = tokens[1] + ' ' + tokens[2];
        dupPerson.age = Number(tokens[3].substr( 1, 2 ));

        element( by.model( 'person.name' ) ).sendKeys( dupPerson.name );
        element( by.model( 'person.age' ) ).sendKeys( dupPerson.age );
        element( by.model( 'person.gender' ) ).sendKeys( dupPerson.gender[0].toUpperCase() );
        element( by.buttonText( 'Add Person!' ) ).click();
        var currentCount = peopleRep.count();
        expect( currentCount ).toBe( originalCount );

      }) );
    } );
  } );

  describe( 'Testing highlighting matches', function () {
    beforeEach( function () {
      browser.get( URL );
    } );

    it( 'should highlight a match', function () {
      element( by.model( 'fo.name' ) ).sendKeys( 't' );
      element.all( by.className( 'highlight' ) ).then( function ( highlighted ) {
        expect( highlighted.length ).toBe( 3 );
      } )

    } );
  } );
} );

