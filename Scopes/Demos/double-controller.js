(function ( angular ) {
  var cityApp = angular.module( 'citiesApp', [] );

  cityApp.controller( 'ParentCtrl', ['$scope', function ( $scope ) {
    // Put code you want shared across both sub-controllers here
  }] );

  cityApp.controller( 'EastCoastCtrl', ['$scope', '$log', function ( $scope, $log ) {
    $scope.cities = [
      {
        "name"       : "New York",
        "state"      : "New York",
        "population" : 8336697

      },
      {
        "name"       : "Newark",
        "state"      : "New Jersey",
        "population" : 277727
      },
      {
        "name"       : "Boston",
        "state"      : "Massachusetts",
        "population" : 636479
      },
      {
        "name"       : "Philadelphia",
        "state"      : "Pennsylvania",
        "population" : 1547607
      },
      {
        "name"       : "Baltimore",
        "state"      : "Maryland",
        "population" : 621342
      },
      {
        "name"       : "Washington",
        "state"      : "District of Columbia",
        "population" : 632323
      },
      {
        "name"       : "Richmond",
        "state"      : "Virginia",
        "population" : 214114
      }
    ];

    $log.log( 'CityListCtrl: exec()' );
  }] );

  cityApp.controller( 'WestCoastCtrl', ['$scope', function ( $scope ) {
    $scope.cities = [
      {
        "name"       : "Los Angeles",
        "state"      : "California",
        "population" : 3857799
      },
      {
        "name"       : "San Diego",
        "state"      : "California",
        "population" : 1338348
      },
      {
        "name"       : "San Jose",
        "state"      : "California",
        "population" : 982765
      },
      {
        "name"       : "San Francisco",
        "state"      : "California",
        "population" : 825863
      },
      {
        "name"       : "Seattle",
        "state"      : "Washington",
        "population" : 634535
      },

      {
        "name"       : "Portland",
        "state"      : "Oregon",
        "population" : 583776
      },
      {
        "name"       : "Oakland",
        "state"      : "California",
        "population" : 400740
      }
    ];

  }] );

})( angular );
