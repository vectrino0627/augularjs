(function ( angular ) {
  var empDetailApp = angular.module( "empDetailApp", [] );

  empDetailApp.controller( 'EmpCtrl', ['$scope', '$http', function ( $scope, $http ) {
    $http( { url : '../../data/northwind-employees.json', method : 'get' } )
      .then( function ( retObj ) {
        $scope.employee = retObj.data[0];
      } )
  }] );

})( angular );
