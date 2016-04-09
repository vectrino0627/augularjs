/*
 * Build an immediately-invoked function expression (IIFE) which loads Angular
 *
 * Inside the IIFE, create a module with the name "iterApp"
 *
 * From the module, register a controller, calling it "MainCtrl". Take the
 * existing array and assign it to $scope.teams
 *
 */

(function ( angular ) {
  var mod = angular.module( 'iterApp', [] );
  mod.controller( 'MainCtrl', function ( $scope ) {
    $scope.teams = ['Mets', 'Yankees', 'Red Sox', 'Phillies', 'Blue Jays',
      'Braves', 'Orioles', 'Marlins', 'Rays', 'Nationals'];
  } )
})( angular );