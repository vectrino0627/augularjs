(function ( angular ) {
  var dirApp = angular.module( 'dirApp', [] );

  dirApp.directive( 'greetings', function () {
    return {
      templateUrl : 'partials/greetings.html',
      restrict    : 'E',
      scope       : {
        localName  : '=personName',
        personName : '='
      }
    };
  } );

  dirApp.directive( 'greetPerson', function () {
    return {
      template : 'Hello, {{greetPerson}}',
      restrict : 'A',
      scope    : {
        greetPerson : '='
      }
    }
  } );

  dirApp.directive( 'greetPersonObject', function () {
    return {
      template : 'Hello, {{gp.name}}',
      restrict : 'A',
      scope    : {
        gp : '=greetPersonObject'
      }
    };
  } );

  dirApp.controller( 'DirCtrl', ['$scope',
    function ( $scope, $log ) {
      $log.log( 'This controller doesn\'t do very much at the moment.' );
      $scope.demoName1 = 'John';
      $scope.demoName2 = 'Bob';
      $scope.demoPerson = {
        name   : 'Frank',
        age    : 56,
        gender : 'male'
      }
    }
  ] );

})( angular );
