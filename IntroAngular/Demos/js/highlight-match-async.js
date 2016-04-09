(function ( _ ) {

  var introApp = angular.module( 'introApp', [] );

  introApp.controller( 'HighlightAsyncCtrl', ['$scope', '$http', '$log',
      function ( $scope, $http, $log ) {

        var originalKeys = [];
        // Initialize the variable
        $scope.people = [];

        $http( {
          method : 'get',
          url    : '/data/people.json'
        } )
          .then( function ( retObj ) {
            originalKeys = _.keys( retObj.data[0] );
            $scope.people = retObj.data;
          } );

        $scope.addPerson = function ( personIn ) {
          var foundDupe = false;
          var tmpPerson =  _.pick(personIn, originalKeys);
          tmpPerson.age = Number( tmpPerson.age );
          $scope.people.some( function ( person ) {
            if ( _.isEqual( tmpPerson, _.pick(person, originalKeys) ) ) {
              foundDupe = true;
              $log.warn( 'Duplicate person!' );
              return true;
            }
          } );

          if ( !foundDupe ) {
            $scope.people.push( tmpPerson );
          }
        }
      }]
  );
})( _ );
