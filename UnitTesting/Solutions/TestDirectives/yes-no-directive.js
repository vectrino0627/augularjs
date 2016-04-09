(function ( angular ) {
  var mod = angular.module( 'glyphDirectives', [] );

  mod.directive( 'yesNo', function () {

    return {
      template : '<span class="glyphicon"></span>',
      restrict: 'E',
      scope: {
        'aaModel' : '=',
        'aaProperty' : '@'
      },
      link: function(scope, element, attrs) {
        if (scope.aaModel[scope.aaProperty]) {
          element.find('span' ).removeClass( 'glyphicon-remove' );
          element.find('span' ).addClass( 'glyphicon-ok' );
        } else {
          element.find('span' ).removeClass( 'glyphicon-ok' );
          element.find('span' ).addClass( 'glyphicon-remove' );
        }
      }
    }
  } )
})( angular );
