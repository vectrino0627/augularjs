(function ( angular ) {
  var mod = angular.module( 'movieBrowser', ['ui.router'] );

  mod.config( function ( $stateProvider, $urlRouterProvider ) {
    $stateProvider.state( 'home', {
      url         : '/home',
      templateUrl : 'partials/movie-title-tpl.html',
      controller  : 'MovieSearchCtrl'
    } );

    $stateProvider.state( 'advancedSearch', {
      url      : '/fullSearch',
      template : '<h2>A full search form will go here eventually</h2>'
    } );

    $stateProvider.state('home.results', {
      url: '/results/{title}',
      templateUrl: 'partials/movie-results-tpl.html',
      controller: 'MovieResultsCtrl'
    });

    $urlRouterProvider.otherwise( '/home' );
  } );

  mod.controller( 'MovieSearchCtrl', function ( $scope, $http, $log, $state ) {
    $scope.findMovie = function ( title ) {
      $log.log( 'You searched on "%s"', title );
      $state.go( 'home.results', { title : title } );
    };
  } );

  mod.controller('MovieResultsCtrl', function($scope, $http, $log, $stateParams) {
    $http.get( 'http://localhost:8001/movies?title=' + $stateParams.title )
      .then(function(retObj) {
        $log.log( 'Movie object for %s: %o', $stateParams.title, retObj.data );
        $scope.movies = retObj.data;
      });

  })

})( angular );
