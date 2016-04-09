describe('Testing highlight-match-async.html', function() {
  var testScope, controller, httpBackend, peopleHandler;

  beforeEach( function () {
    module( 'introApp' );
    inject( function ( $controller, $rootScope, $httpBackend ) {
      controller = $controller;
      testScope = $rootScope.$new();
      httpBackend = $httpBackend;
      peopleHandler = $httpBackend.when('GET', '/data/people.json')
        .respond([
          { "name" : "Jenny Sparks", "gender" : "female", "age" : 15 },
          { "name" : "Lucas Trent", "gender" : "male", "age" : 35 },
          { "name" : "Jack Hawksmoor", "gender" : "male", "age" : 42 },
          { "name" : "Jeroen Thornedike", "gender" : "male", "age" : 28 },
          { "name" : "Angela Spica", "gender" : "female", "age" : 44 },
          { "name" : "Shen Li-Min", "gender" : "female", "age" : 22 },
          { "name" : "Spider Jerusalem", "gender" : "male", "age" : 40 },
          { "name" : "Jakita Wagner", "gender" : "female", "age" : 38 },
          { "name" : "Elijah Snow", "gender" : "male", "age" : 48 },
          { "name" : "Ambrose Chase", "gender" : "male", "age" : 25 }
        ]);

    } );
  } );

  it('it should add a person', function() {
    var testPerson = {
      name: 'Cameron Hodge',
      age: 50,
      gender: 'male'
    };

    controller( 'HighlightAsyncCtrl', { $scope : testScope } );
    httpBackend.flush();
    var currentCount = testScope.people.length;
    testScope.addPerson( testPerson );
    expect( testScope.people.length ).toEqual( currentCount + 1 );
  });

  it('it should not add a duplicate', function() {
    controller( 'HighlightAsyncCtrl', { $scope : testScope } );
    httpBackend.flush();
    var currentCount = testScope.people.length;
    var clonedPerson = _.clone( testScope.people[0] );
    testScope.addPerson( clonedPerson );
    expect( testScope.people.length ).toEqual( currentCount );
    expect( testScope.people.length ).toEqual( 10 );
  })
});
