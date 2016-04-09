(function ( angular ) {
  var mod = angular.module( 'factoriesApp', [] );

  mod.value( 'authorName', 'John Paxton' );

  mod.controller( 'MainCtrl', ['$scope', 'testFactory', '$log',
    function ( $scope, testFactory, $log ) {
      $log.log( 'MainCtrl created' );

      $scope.createdTime = testFactory.getCreatedDate().getTime();
      $scope.getTime = testFactory.getTime();
      $scope.getCodeName = testFactory.getCodeName;

    }] );

  mod.controller( 'OtherCtrl', ['$scope', 'testFactory', '$timeout', '$log',
    function ( $scope, testFactory, $timeout/*, otherFactory*/ ) {
      $log.log( 'OtherCtrl created' );

      $scope.createdTime = testFactory.getCreatedDate().getTime();
      $scope.getCodeName = testFactory.getCodeName;

      $timeout( function () {
        $scope.getTime = testFactory.getTime();
      }, 583 );

      /*
       * Demonstrating that the factory is a singleton. Updating the codename here
       * in OtherCtrl, has an effect on codename in MainCtrl. If they were
       * different factory instances, this would not be the case
       */
      $scope.updateCodeName = function ( newCodeName ) {
        testFactory.setCodeName( newCodeName );
      }
    }] );

  /*
   * We can have dependencies (including other services)
   * We have an initialization function
   * And the function is lazily run (just-in-time, really)
   * And the result is only generated once
   */
  mod.factory( 'testFactory', ['authorName', '$log', function ( authorName, $log ) {
    var createDate = new Date();
    var codeName = 'Duchess';
    $log.log( 'Creating testFactory at %s', createDate.toString() );
    $log.log( 'Authored by ' + authorName );

    var obj = {
      getCreatedDate : function () {
        return createDate;
      },

      getTime : function () {
        return new Date().getTime();
      },

      getCodeName : function () {
        return codeName;
      },

      setCodeName : function ( newCodeName ) {
        codeName = newCodeName;
      }
    };

    return obj;

  }] );

  mod.factory( 'otherFactory', function ( $log ) {
    $log.log( 'otherFactory: Creating the factory' );

    return {
      getIdentity : function () {
        return 'otherFactory';
      }
    }
  } );

})( angular );
