/*
 * Using an IIFE, create an angular module "firstApp"
 * It should have a controller "MainCtrl" which depends on $scope
 * Inside of the controller, create an array on $scope called teams
 * List a few sports teams on the array
 */

(function ( angular ) {
  var mod = angular.module( 'firstApp', [] );
  mod.controller( 'MainCtrl', function ( $scope ) {
    $scope.teams = ['Mets', 'Yankees', 'Knicks', 'Nets', 'Rangers',
      'Devils', 'Islanders', 'Giants', 'Jets'];
  } );
})( angular );