(function ( angular ) {
  var dirApp = angular.module( 'dirApp', [] );

  dirApp.directive( 'greetPerson', function () {
    return {
      template : 'Hello, {{ greetPerson }}',
      restrict : 'A',
      scope    : {
        greetPerson : '@'
      }
    }
  } );

  dirApp.directive( 'greetPersonObj', function () {
    return {
      template : 'Hello, {{ person.firstName }} {{ person.lastName }}',
      restrict : 'A',
      scope    : {
        person : '='
      }
    }
  } );

  dirApp.directive( 'greetings', function () {
    return {
      templateUrl : 'partials/greetings.html',
      restrict    : 'E',
      scope       : {
        'personObj' : '=person'
      }
    };
  } );

  dirApp.controller( 'DirCtrl', ['$scope',
    function ( $scope, $log ) {
      $log.log( 'This controller doesn\'t do very much at the moment.' );
      $scope.demoName1 = 'Angela';
      $scope.someName = 'Krishna';

      $scope.employee = {
        firstName : 'John',
        lastName  : 'Paxton'
      }

    }
  ] );

})( angular );
