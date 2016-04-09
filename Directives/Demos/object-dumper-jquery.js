(function ( angular ) {
  angular.module( 'dumperApp', [] )
    .directive( 'objectDumper', function () {
      return {
        restrict : 'E',
        scope    : {
          obj : '=input'
        },
        link     : function ( scope, element, attrs ) {
          var keys = Object.keys( scope.obj );
          element.append( '<ul></ul>' );
          var base = element.find( 'ul' );
          keys.forEach( function ( key ) {
            base.append( '<li>' + key + ' : ' + scope.obj[key] + '</li>' );
          } );
        }
      }
    } )
    .controller( 'DumperCtrl', ['$scope', function ( $scope ) {
      $scope.testObj = {
        foo  : 'bar',
        name : 'John',
        age  : 40,
        male : true
      };

    }] );

})( angular );
