(function(angular) {
  var mod = angular.module( 'citiesAppTest', ['citiesApp', 'ngMockE2E'] );

  mod.run(function($httpBackend) {
    var cities = [
      {
        "name" : "New York",
        "state": "New York",
        "population" : 8336697

      },
      {
        "name" : "Newark",
        "state" : "New Jersey",
        "population" : 277727
      },
      {
        "name" : "Boston",
        "state" : "Massachusetts",
        "population" :636479
      },
      {
        "name" : "Philadelphia",
        "state" : "Pennsylvania",
        "population" :1547607
      },
      {
        "name" : "Baltimore",
        "state" : "Maryland",
        "population" :621342
      }];

    $httpBackend.whenGET( /\/data\/cities\.json\?.+/ ).respond(cities);

  })
})(angular);
