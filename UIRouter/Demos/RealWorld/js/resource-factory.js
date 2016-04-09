(function(angular) {
  var mod = angular.module( 'northwindResources', ['ngResource'] );

  mod.factory('customerResource', function($resource, $log) {
    var customerResource = $resource('http://localhost:8001/northwind/customers/:customerID');

    return customerResource;
  })
})(angular);
