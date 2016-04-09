(function(angular) {
  var mod = angular.module( 'ProductBrowser', [] );

  mod.controller('ProductCtrl', function($log) {
    $log.log( 'ProductCtrl: Doesn\'t do much at the moment' );
  });

  mod.controller('ProductBannerCtrl', function($log) {
    $log.log( 'ProductBannerCtrl: Doesn\'t do much at the moment' );
  });

  /*
   * Build a directive which generates
   * - a div with classes col-sm-12 and text-center
   * - with a child h2 with content 'Browse our products'
   *
   * Restrict it to being an element
   */
  mod.directive('productBanner', function() {
    return {
      template: '<div class="col-sm-12 text-center"><h2>Browse our products</h2></div>',
      restrict: 'E'
    }
  });

})(angular);