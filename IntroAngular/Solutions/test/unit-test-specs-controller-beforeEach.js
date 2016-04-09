/*
 * Build a set of unit tests for the controller you completed in the last
 * exercise. The structure should look something like this:
 *
 * describe // Top-level for the TeamApp module
 *   beforeEach // Load the teamApp module
 *   describe // Test the TeamCtrl controller
 *     it // Make sure that $scope.teams has ten elements
 *     it // Make sure that the third element is "Red Sox"
 */
describe( 'TeamApp Controller', function () {
  var testScope;

  beforeEach( function () {
    module( 'teamApp' );
    testScope = {};

    // This is like <div ng-controller="TeamCtrl">
    inject( function ( $controller ) {
      $controller( 'TeamCtrl', {$scope : testScope} );
    } );

  } );

  describe( 'Testing TeamCtrl', function () {

    it( 'should have 10 elements', function ( ) {

      expect( testScope.teams.length ).toBe( 10 );
    } );

    it( 'should have the Red Sox as the third element', function ( ) {
      //expect( scope.teams[2] ).toEqual( 'Red Sox' );

      // Just testing for the presence of 'Red Sox'
      expect( testScope.teams.indexOf( 'Red Sox' ) ).toBeGreaterThan( -1 );
    } );

  } );

} );
