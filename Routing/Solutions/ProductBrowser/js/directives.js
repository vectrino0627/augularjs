(function ( angular ) {
  var mod = angular.module( 'productDirectives', [] );

  mod.directive( 'navButtons', function () {
    return {
      restrict    : 'E',
      templateUrl : 'partials/nav-buttons-tpl.html',
      scope       : {
        currentProduct : '='
      },
      link        : function ( scope ) {
        scope.nextPrev = function ( product, dir ) {
          scope.$emit( 'nextProduct', product, dir );
        }
      }
    };
  } )
})( angular );
