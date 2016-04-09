(function ( angular ) {
  var mod = angular.module( 'statesAccess', [] );

  mod.factory( 'statesDAO', function ( $http ) {
    var dao = {};
    dao.data = [];
    dao.abbrevLookup = {};
    dao.stateLookup = {};

    dao.refresh = function () {
      dao.data.splice( 0, dao.data.length );
      var p = $http( {
        url    : '../data/states.json',
        method : 'get'
      } );

      p.success( function ( retObj ) {
        retObj.data.forEach( function ( record ) {
          dao.stateLookup[record.name] = record;
          dao.abbrevLookup[record.abbreviation] = record;
          dao.data.push( record );
        } );
      } );

      dao.promise = p;
    };

    dao.getState = function ( state ) {
      state = state.toUpperCase();
      if ( state.length === 2 ) {
        return dao.abbrevLookup[state];
      } else {
        return dao.stateLookup[state]
      }
    };

    dao.getStates = function () {
      return dao.states;
    }

  } )
})( angular );
