(function(angular) {
  var pb = angular.module( 'ProductBrowser', ['ngRoute', 'productControllers', 'productDirectives'] );
  pb.config( ['$routeProvider',
    function ( $routeProvider ) {
      $routeProvider
        .when( '/products', {
          templateUrl : 'partials/search-list-detail-tpl.html',
          controller : 'ProductSearchListDetailCtrl'
        } )
        .otherwise( {
          redirectTo : '/products'
        } );

    }] );

})(angular);
