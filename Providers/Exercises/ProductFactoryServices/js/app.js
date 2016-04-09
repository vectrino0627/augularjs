(function ( angular ) {
  var pb = angular.module( 'ProductBrowser',
    ['ngRoute', 'productConstants', 'productControllers'] );
  pb.config( function ( $routeProvider, urlBase ) {
    $routeProvider
      .when( urlBase, {
        templateUrl : 'partials/search-tpl.html',
        controller  : 'ProductSearchCtrl'
      } )
      .when( urlBase + '/search', {
        templateUrl : 'partials/search-tpl.html',
        controller  : 'ProductSearchCtrl'
      } )
      .when( urlBase + '/list/:listFilter*', {
        templateUrl : 'partials/list-tpl.html',
        controller  : 'ProductListCtrl'
      } )
      .when( urlBase + '/detail/:productID', {
        templateUrl : 'partials/detail-tpl.html',
        controller  : 'ProductDetailCtrl'
      } )
      .otherwise( {
        redirectTo : urlBase
      } );

  } );

})( angular );
