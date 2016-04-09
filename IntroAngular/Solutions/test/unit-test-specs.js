/*
 * Build a set of unit tests for the controller you completed in the last
 * exercise. The structure should look something like this:
 *
 * describe // Top-level for the TeamApp module
 *   declare variables for testScope, which will be shared
 *   throughout the application.
 *
 *   beforeEach // Load the teamApp module
 *              // Inject the controller lookup service and
 *              // instantiate a scope into testScope
 *   describe // Check functionality in TeamCtrl
 *     it: Check data in TeamCtrl
 *        expect: Make sure that $scope.teams has ten elements
 *        expect: Make sure that the third element is "Red Sox"
 *     it: Check the function delTeam
 *       expect: Should verify that a team has been deleted
 *       expect: Should verify that the teams list is shorter
 *     it: Check restoreTeams
 *       expect: verify deletes, as above
 *       expect: verify that deleted teams have come back
 */

describe( 'TeamApp Controller', function () {
  var testScope, teamToDelete, numberOfTeams;

  beforeEach( function () {
    module( 'teamApp' );
    inject( function ( $controller, $rootScope ) {
      testScope = $rootScope.$new();
      $controller( 'TeamCtrl', { $scope : testScope } );
      teamToDelete = testScope.teams[2];
      numberOfTeams = testScope.teams.length;
    } );
  } );

  describe( 'Testing TeamCtrl data', function () {
    it( 'should have 10 elements, the third element should be "Red Sox". ', function () {
      expect( testScope.teams.length ).toBe( 10 );

      // Test for 'Red Sox' by known position
      expect( testScope.teams[2] ).toEqual( 'Red Sox' );

      // Alternative: Just testing for the presence of 'Red Sox'
      expect( testScope.teams.indexOf( 'Red Sox' ) ).toBe( 2 );
    } );

    it( 'should delete a team', function () {
      testScope.delTeam( teamToDelete );
      expect( testScope.teams.indexOf( teamToDelete ) ).toBe( -1 );
      expect( testScope.teams.length ).toBeLessThan( numberOfTeams );
    } );

    it( 'should restore a deleted team', function () {
      expect( testScope.teams.length ).toBeGreaterThan( 1 );
      testScope.delTeam( teamToDelete );
      expect( testScope.teams.indexOf( teamToDelete ) ).toBe( -1 );
      expect( testScope.teams.length ).toBeLessThan( numberOfTeams );

      testScope.restoreTeams();
      expect( testScope.teams.indexOf( teamToDelete ) ).toBeGreaterThan( -1 );
      expect( testScope.teams.length ).toBe( numberOfTeams );
    } );
  } );

} );
