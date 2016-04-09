describe( 'Testing filter-module.js', function () {
  var $filter;

  beforeEach( function () {
    module( 'filterMod' );
    inject( function ( _$filter_ ) {
      $filter = _$filter_;
    } );
  } );

  describe( 'betterThanFilter', function () {
    var betterThan;
    var dataSet = [
      {
        "rank"           : 1,
        "won"            : 93,
        "lost"           : 69,
        "city"           : "Detroit",
        "team"           : "Tigers",
        "team_id"        : "detroit-tigers",
        "win_percentage" : ".574",
        "address"        : "Comerica Park, 2100 Woodward Ave., Detroit, MI 48201",
        "lat"            : 42.346354,
        "lng"            : -83.059619
      },
      {
        "rank"           : 2,
        "won"            : 92,
        "lost"           : 70,
        "city"           : "Cleveland",
        "team"           : "Indians",
        "team_id"        : "cleveland-indians",
        "win_percentage" : ".568",
        "address"        : "2401 Ontario Street, Cleveland, OH 44115",
        "lat"            : 41.495149,
        "lng"            : -81.68709
      },
      {
        "rank"           : 3,
        "won"            : 86,
        "lost"           : 76,
        "city"           : "Kansas City",
        "team"           : "Royals",
        "team_id"        : "kansas-city-royals",
        "win_percentage" : ".531",
        "address"        : "P.O. Boz 419969, Kansas City, MO 64141",
        "lat"            : 39.10222,
        "lng"            : -94.583559
      },
      {
        "rank"           : 4,
        "won"            : 66,
        "lost"           : 96,
        "city"           : "Minnesota",
        "team"           : "Twins",
        "team_id"        : "minnesota-twins",
        "win_percentage" : ".407",
        "address"        : "501 Chicago Ave. S., Minneapolis, MN 55415",
        "lat"            : 44.974346,
        "lng"            : -93.259616
      },
      {
        "rank"           : 5,
        "won"            : 63,
        "lost"           : 99,
        "city"           : "Chicago",
        "team"           : "White Sox",
        "team_id"        : "chicago-white-sox",
        "win_percentage" : ".389",
        "address"        : "333 W. 35th Street, Chicago, IL 60616",
        "lat"            : 41.830883,
        "lng"            : -87.635083
      }];

    beforeEach( function () {
      betterThan = $filter( 'betterThan' );
    } );

    it( 'should use defaults correctly', function () {
      // Defaults are currently 0.5 for winning percentage and 81 for
      // minimum number of wins
      var defaultPct  = 0.5,
          defaultWins = 81;
      var results = betterThan( dataSet );
      expect( results.length ).toBe( 3 );
      expect( results[0].win_percentage ).toBeGreaterThan( defaultPct );
      expect( results[0].won ).toBeGreaterThan( defaultWins );

    } );
    it( 'should filter on winning percentage', function () {
      var pct = .57;
      var results = betterThan( dataSet, pct );

      expect( results.length ).toBe( 1 );
      expect( results[0].team ).toBe( 'Tigers' );
      expect( results[0].win_percentage ).toBeGreaterThan( pct );
    } );

    it( 'should filter on minimum number of wins', function () {
      var pct  = .5,
          wins = 90;
      var results = betterThan( dataSet, pct, wins );
      expect( results.length ).toBe( 2 );
      expect( results[0].team ).toBe( 'Tigers' );
      expect( results[1].won ).toBeGreaterThan( wins );
    } );
  } );

} );
