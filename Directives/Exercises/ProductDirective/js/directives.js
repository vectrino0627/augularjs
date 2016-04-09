(function ( angular ) {
  var mod = angular.module( 'productDirectives', [] );

  mod.directive( 'productBanner', function ( $location ) {
    /*
     * In the configuration below, build a directive, product-banner, which will
     * replace the hard-coded banner with a variable banner message
     *
     * Define a link function that listens for a scope change event
     * (hint: scope.$on('$routeChangeStart'))
     * When that event fires, use the $location provider to figure out
     * what route you're on and change bannerMsg as follows:
     * - List route: 'List of products'
     * - Detail route: 'Details for product #' and then the productID
     * - Other route: 'Browse our products'
     * 
     */
    return {
      template : '<div class="col-sm-12 text-center"><h2>{{ bannerMsg }}</h2></div>',
      restrict : 'E',
    }
  } );

})( angular );