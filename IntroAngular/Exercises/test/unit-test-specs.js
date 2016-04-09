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


describe( "Testing teamApp javascript codes", function () {
    var testScope;
    beforeEach(function () {
        angular.mock.module( "teamApp" );
        angular.mock.inject(function ( $controller, $rootScope) {
            //create an empty scope
            testScope = $rootScope.$new();
            //declare the controller and inject our empty scope
            $controller('TeamCtrl', {$scope: testScope});
        });
    });



    describe( "Check functionality in TeamCtrl", function () {
        it('Check data in TeamCtrl, it should have ten teams', function(){
            expect( testScope.teams.length ).toBe(10);
        });

        it('Check data in TeamCtrl, the second team is Red Sox', function(){
            expect( testScope.teams[2] ).toBe('Red Sox');
        });


        it('Check dropTeam to drop Red sox, it should have nine teams', function(){
            testScope.delTeam("Red Sox");
            expect( testScope.teams.length ).toBe(9);
            expect( testScope.teams ).not.toContain("Red Sox");
        });


        it('Check restoreTeams, it should have ten teams again', function(){

            testScope.restoreTeams();
            expect(testScope.teams.length).toBe(10);
            expect(testScope.teams).toContain("Red Sox");
        });






    });
});