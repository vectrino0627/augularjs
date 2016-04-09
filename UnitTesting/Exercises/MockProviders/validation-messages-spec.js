describe( 'validation-messages.js', function () {
  var testScope, $controller,
      customers, cities, countries, refreshSpy;

  beforeEach( function () {
    refreshSpy = jasmine.createSpy();
    module( 'customerApp' );

    /*
     * Mock out the customerDAO factory. Provide the following functions:
     * getCustomers (returns customers, provided below)
     * getCities (returns cities, provided below)
     * getCountries (returns countries, provided below)
     * refresh: Assigned the refreshSpy, created above
     */


    inject( function ( _$controller_, $rootScope ) {
      testScope = $rootScope.$new();
      $controller = _$controller_;
    } );
  } );

  describe( 'CustomerCtrl', function () {
    beforeEach( function () {
      testScope.dbobj = {
        contactName : 'Bob Dobalina',
        companyName : 'Daisies For You'
      };

      $controller( 'CustomerCtrl', {
        $scope : testScope
      } );

    } );

    describe( 'Data refreshes', function () {

      it( 'should call customerDAO.refresh() on a change to $scope.dbobj.contactName',
        function() {
          /*
           * Write a spec conforming to the message above
           * Steps:
           * Change testScope.dbobj.contactName
           * Call testScope.$digest (which will activate the $watch)
           * Then write at least two expectations to test whether
           * customerDAO.refresh() was called
           */
        });
    } );
  } );

  beforeAll( function () {
    countries = ['Germany', 'Mexico', 'UK'];
    cities = ['Berlin', 'M\u00e9xico D.F.', 'London'];
    customers = [
      {
        "odata.metadata" : "http://services.odata.org/V3/Northwind/Northwind.svc/$metadata#Customers/@Element",
        "customerID"     : "ALFKI",
        "companyName"    : "Alfreds Futterkiste",
        "contactName"    : "Maria Anders",
        "contactTitle"   : "Sales Representative",
        "address"        : "Obere Str. 57",
        "city"           : "Berlin",
        "region"         : null,
        "postalCode"     : "12209",
        "country"        : "Germany",
        "phone"          : "030-0074321",
        "fax"            : "030-0076545"
      },
      {
        "odata.metadata" : "http://services.odata.org/V3/Northwind/Northwind.svc/$metadata#Customers/@Element",
        "customerID"     : "ANATR",
        "companyName"    : "Ana Trujillo Emparedados y helados",
        "contactName"    : "Ana Trujillo",
        "contactTitle"   : "Owner",
        "address"        : "Avda. de la Constituci\u00f3n 2222",
        "city"           : "M\u00e9xico D.F.",
        "region"         : null,
        "postalCode"     : "05021",
        "country"        : "Mexico",
        "phone"          : "(5) 555-4729",
        "fax"            : "(5) 555-3745"
      },
      {
        "odata.metadata" : "http://services.odata.org/V3/Northwind/Northwind.svc/$metadata#Customers/@Element",
        "customerID"     : "ANTON",
        "companyName"    : "Antonio Moreno Taquer\u00eda",
        "contactName"    : "Antonio Moreno",
        "contactTitle"   : "Owner",
        "address"        : "Mataderos  2312",
        "city"           : "M\u00e9xico D.F.",
        "region"         : null,
        "postalCode"     : "05023",
        "country"        : "Mexico",
        "phone"          : "(5) 555-3932",
        "fax"            : null
      },
      {
        "odata.metadata" : "http://services.odata.org/V3/Northwind/Northwind.svc/$metadata#Customers/@Element",
        "customerID"     : "AROUT",
        "companyName"    : "Around the Horn",
        "contactName"    : "Thomas Hardy",
        "contactTitle"   : "Sales Representative",
        "address"        : "120 Hanover Sq.",
        "city"           : "London",
        "region"         : null,
        "postalCode"     : "WA1 1DP",
        "country"        : "UK",
        "phone"          : "(171) 555-7788",
        "fax"            : "(171) 555-6750"
      }
    ];
  } )
} );
