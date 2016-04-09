(function ( angular ) {
  var firstRt = angular.module( 'firstRt', ['ngRoute', 'rtControllers'] );

  firstRt.config( ['$routeProvider', '$locationProvider',
    function ( $routeProvider, $locationProvider ) {
      $routeProvider
        .when( '/customers', {
          templateUrl : 'partials/cust-list-tpl.html',
          controller  : 'CustListCtrl'
        } )
        .when( '/customers/:custID', {
          templateUrl : 'partials/cust-detail-tpl.html',
          controller  : 'CustDetailCtrl'
        } )
        .otherwise( {
          redirectTo : '/customers'
        } );

      // Don't forget to add a <base href> to index.html
      $locationProvider.html5Mode( true );
    }] );
})( angular );
