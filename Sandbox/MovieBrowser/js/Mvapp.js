/**
 * Created by nuo134 on 12/16/2015.
 */


(function(angular)    {
    var mod = angular.module('movieBrowser', ['ui.router']);

    mod.config(function($stateProvider,$urlRouterProvider){
        $stateProvider.state('home',{
            url: '/home',
            templateUrl: 'partials/movie-title.html',
            controller:'MovieSearchCtrl'
        });

        $stateProvider.state('other',{
            url:'/other',
            template: '<h2> This si a diff page </h2>'
        });
        $stateProvider.state('search',{
            url:'/search',
            template: '<h2> This si a diff page </h2>'
        });

        $stateProvider.state('home.results',{
            url:'/results{title}',
            templateUrl:'mov-res',
            controller:'MovieResults'
        });

        mod.controller('MovieResults', function($scope,$log, $http, $stateParams){

                $log.log('You are searching the movie: ' + $stateParams.title);
                $http.get('http://localhost:8000/movies?title=' + title)
                    .then(function(retObj){
                        $log.log('Movie object for %s: %o', title, retObje.data);
                    });
            });

        $urlRouterProvider.otherwise('/home');

        mod.controller('MovieSearchCtrl', function($scope,$log, $http){
            $scope.findMovie = function(title){
                $log.log('You are searching the movie: ' + title);
                $http.get('http://localhost:8000/movies?title=' + title)
                    .then(function(retObj){
                        $log.log('Movie object for %s: %o', title, retObje.data);
                    });
            };

        })
    })



})(angular);
