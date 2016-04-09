describe( 'Testing validation-messages.html', function () {

  var URL = 'End2EndTesting/Solutions/MockedBackend/e2e-mock-validation-messages.html';
  beforeEach( function () {
    browser.get( URL );
  } );

  describe( 'At page load', function () {
    it( 'should find some customers at page load', function () {
      var customers = element.all( by.repeater( 'customer in customers' ) );

      expect( customers.getText() ).toContain( 'Around the Horn' );
      expect( customers.getText() ).toContain( 'White Clover Markets' );
    } );
  } );

  describe( 'Filtering tests', function () {
    var customerList, companyName, contactName, city, country;

    beforeEach( function () {
      customerList = element.all( by.repeater( 'customer in customers' ) );
      companyName = element( by.model( 'dbobj.companyName' ) );
      contactName = element( by.model( 'dbobj.contactName' ) );
      city = element( by.model( 'fobj.city' ) );
      country = element( by.model( 'fobj.country' ) );
    } );

    it('should filter by company name', function() {
      companyName.sendKeys( 'V' );
      expect( customerList.count() ).toBe( 3 );
      expect( customerList.getText() ).toContain( 'Vaffeljernet' );
    });

    it('should filter by contact name', function() {
      contactName.sendKeys('A');
      expect( customerList.count() ).toBe( 10 );
      expect( customerList.getText() ).toContain( 'Eastern Connection' );
    });

    it('should filter by city', function() {
      city.sendKeys( 'Buenos' );
      expect( customerList.count() ).toBe( 3 );
      expect( customerList.getText() ).toContain( 'Rancho grande' );
    });

    it('should toggle cities based on country selection', function() {
      country.sendKeys( 'Belgium' );
      var cities = city.getText();
      expect( cities ).toContain( 'Bruxelles' );
      expect( cities ).not.toContain( 'London' );
    });

  } )
} );

