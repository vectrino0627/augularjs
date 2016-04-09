(function ( angular ) {
  var dirApp = angular.module( 'dirApp', [] );

  dirApp.directive( 'greetPerson', function () {
    return {
      template : 'Hello, {{ personName }}',
      restrict : 'A',
      scope    : {
        personName : '=greetPerson'
      }
    }
  } );

  dirApp.directive( 'greetPersonObj', function () {
    return {
      template : 'Hello, {{ obj.firstName }} {{ obj.lastName }}',
      restrict : 'A',
      scope    : {
        obj : '=greetPersonObj'
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

  dirApp.controller( 'DirCtrl',
    function ($log) {
      $log.log( 'This controller doesn\'t do very much at the moment.' );
      this.demoName1 = 'Angela';
      this.someName = 'Krishna';

      this.employee = {
        firstName : 'John',
        lastName  : 'Paxton'
      }

    } );

})( angular );
