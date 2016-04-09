/*
 * Write a set of unit tests for add-name.js. In particular, you should test
 * the following:
 *
 * On calling addPerson, a person is successfully added
 * On calling addPerson with a duplicate, the duplicate is _not_ added
 *
 */

describe('Testing add-name.js', function () {
  var testScope, $controller;

  beforeEach( function () {
    module( 'addNameApp' );
    inject(function(_$controller_, $rootScope) {
      testScope = $rootScope.$new();
      $controller = _$controller_;
    });
  } );

  describe('AddNameCtrl', function () {
    beforeEach( function () {
      $controller( 'AddNameCtrl', {
        $scope : testScope
      } );
    });

    it('should add a new person', function () {
      var person = {
        name: 'Kim',
        gender: 'female',
        age: 36
      };

      var originalLength = testScope.people.length;
      testScope.addPerson( person );
      expect( testScope.people.length ).toBe( originalLength + 1 );

      // Get the last element, see if it's equal to the element we added
      expect( testScope.people[originalLength] ).toEqual( person );
    });

    it('should not add a duplicate person', function() {
      var dupe = testScope.people[0];
      var originalLength = testScope.people.length;
      testScope.addPerson( dupe );

      var subset = testScope.people.slice( 1 );

      expect( testScope.people.length ).toBe( originalLength);
      expect( subset.indexOf( dupe ) ).toBe( -1 );

    })
  })

});
