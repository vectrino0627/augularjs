/*
 * Create a module called statesApp
 * It will have no dependencies
 * Add a controller to it called StateCtrl which depends on $scope and $http.
 * Use the minification-proof style of declaring a controller
 *
 * Use $http to download /data/states.json
 * Make it available to the view by publishing/copying it to $scope.states
 */

(function ( angular ) {

  var mod = angular.module( 'statesApp', [] );

  mod.controller( 'StateCtrl', ['$scope', '$http', '$log',
    function ( $scope, $http, $log ) {

      $http.get('/data/states.json')
        .then(function(retObj) {
          $scope.states = retObj.data;
        });

      $scope.toggleSort = function(fieldName) {
        if ($scope.sortField === fieldName) {
          return '-' + fieldName;
        }
        return fieldName;
      };

      $scope.sortIndicator = function(fieldName) {
        if ($scope.sortField === fieldName) {
          return 'glyphicon glyphicon-chevron-up';
        } else if ($scope.sortField === '-' + fieldName) {
          return 'glyphicon glyphicon-chevron-down';
        }
      };

    }] )
})( angular );