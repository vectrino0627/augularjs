(function (angular) {
    /*
     * Create a module called ProductBrowser
     * It will have dependencies of ngRoute and productControllers
     * Assign it to a variable "pb"
     */
    var pb = angular.module("ProductBrowser", ['ui.router', 'productControllers']);
    /*
     * At this point, you can browse to
     * localhost:8000/Routing/Exercises/ProductRouteOne
     * and you will see a simple message: "Browse our Products".
     * The console will have a message from ProductCtrl as well
     *
     * Once you've tested that, uncomment the configuration below and fill in
     * the when block and the otherwise block
     */

    pb.config( function ( $stateProvider, $urlRouterProvider ) {
    $stateProvider.state('home', {
            url: '/home',
            templateUrl: 'partials/product-title-tpl.html',
            controller: 'ProductCtrl'
        });


        $stateProvider.state('detail', {
            url: '/details/{product}',
            templateUrl: 'partials/product-detail-tpl.html',
            controller: 'ProductCtrl'
        });

        $urlRouterProvider.otherwise( '/home' );

        /*pb.controller( 'MovieSearchCtrl', function ( $scope, $http, $log, $state ) {
            $scope.findMovie = function ( title ) {
                $log.log( 'You searched on "%s"', title );
                $state.go( 'home.results', { title : title } );
            };
        } );*/
                /*
                 pb.config( ['$routeProvider',
                 function ( $routeProvider ) {
                 $routeProvider
                 .when( '/products', {
                 templateUrl : 'partials/product-list-tpl.html',
                 controller : 'ProductListCtrl'
                 } )

                 //Add a route so that looking for /products/5 will bring up the page
                 //for the product with the productID of 5
                 //
                 //Add an otherwise call that redirects to '/products' as a default
                 }] );
                 */
                // When you're finished, move on to editing controllers.js

            });

})(angular);
