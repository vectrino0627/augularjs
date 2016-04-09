(function(angular) {
  var mod = angular.module( 'productValues', [] );

  /*
   * Build a utility function, listFilterBuilder
   * Inputs: productName, category, supplier
   * Returns a URL suitable for list determination, e.g.
   * /categoryID/$categoryID/supplierID/$supplierID
   *
   * It should build a string that takes the form of
   * /productName/[prodNameValue]/categoryID/[categoryIDValue]/supplierID/[supplierIDValue]
   * The values in [] should be determined by the arguments passed to it
   * And all arguments are optional, so it could return a string as simple as
   * /supplierID/5
   * or as complex as
   * /productName/blah/categoryID/4/supplierID/3
   */

    mod.value('listFilterBuilder', function(productName,
        category, supplier ){
        var abc = "";
            if(productName)
            {abc += '/productName/' + productName;
    }
            if (category) {
                if (typeof category === 'object') {
                    abc += '/categoryID/' + category.categoryID;
                } else {
                    abc += '/categoryID/' + category;
                }
            }

            if (supplier) {
                if (typeof supplier === 'object') {
                    abc += '/supplierID/' + supplier.supplierID;
                } else {
                    abc += '/supplierID/' + supplier;
                }
            }

            return abc;

}
    );




})(angular);