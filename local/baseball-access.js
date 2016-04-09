(function ( angular ) {
  var mod = angular.module( 'baseballAccess', [] );

  mod.factory( 'baseballDAO', function ( $http ) {
    var dao = {};
    dao.data = [];

    dao.refresh = function () {
      var p = $http( {
        url    : '/data/baseball-standings-2014.json',
        method : 'get'
      } );

      p.then( function ( retObj ) {
        var data = retObj.data;
        var standings = data.standing;
        dao.data.splice( 0, dao.data.length );
        standings.forEach( function ( teamData ) {
          teamData.city = teamData.first_name;
          teamData.team = teamData.last_name;
          dao[teamData.team] = teamData;
          dao.data.push( teamData );
        } )
      } )
    };

    dao.getData = function () {
      return dao.data;
    };

    dao.getTeam = function ( team ) {
      return dao[team];
    };

    dao.refresh();
    return dao;

  } )
})( angular );
