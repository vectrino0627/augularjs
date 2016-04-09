(function(angular) {
  var mod = angular.module( 'productValues', [] );

  mod.value('listFilterBuilder', function(productName, category, supplier) {
    var baseRoute = '';
    if (productName) {
      baseRoute += '/productName/' + productName;
    }

    if (category) {
      if (typeof category === 'object') {
        baseRoute += '/categoryID/' + category.categoryID;
      } else {
        baseRoute += '/categoryID/' + category;
      }
    }

    if (supplier) {
      if (typeof supplier === 'object') {
        baseRoute += '/supplierID/' + supplier.supplierID;
      } else {
        baseRoute += '/supplierID/' + supplier;
      }
    }
    return baseRoute;
  })
})(angular);