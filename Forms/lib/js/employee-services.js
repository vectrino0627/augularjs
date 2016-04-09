(function ( angular ) {
  var mod = angular.module( 'employeeServices', [] );
  mod.factory( 'employeeDAO', function ( $http ) {

    var dao = {
      employees    : [],
      employeeById : {},
      loaded       : false
    };

    dao.refresh = function ( query ) {
      dao.employees.splice( 0, dao.employees.count );
      dao.loaded = false;

      var p = $http( {
        url    : 'http://localhost:8001/northwind/employees',
        method : 'get',
        params : query
      } );

      var p2 =  p.then( function ( retObj ) {
        var data = retObj.data;
        data.forEach( function ( record ) {
          dao.employees.push( record );
          dao.employeeById[record.employeeID] = record;
          dao.loaded = true;
        } );
      } );

      p2.then( function () {
        dao.employees.sort( function ( emp1, emp2 ) {
          if ( emp1.employeeID < emp2.employeeID ) {
            return -1
          }
          if ( emp1.employeeID > emp2.employeeID ) {
            return 1;
          }

          return 0;
        } )
      } );
      dao.p = p;
    };

    dao.getEmployees = function () {
      return dao.employees;
    };

    dao.getEmployee = function ( id ) {
      var emp = {};
      $http( {
        url    : 'http://localhost:8001/northwind/employees/' + id,
        method : 'get'
      } )
        .then( function ( retObj ) {
          angular.extend( emp, retObj.data );
        } );

      return emp;
    };

    dao.getPromise = function () {
      return dao.p;
    };

    dao.success = function ( fn ) {
      dao.p.then( fn );
    };

    dao.refresh();

    return dao;

  } );
})( angular );
