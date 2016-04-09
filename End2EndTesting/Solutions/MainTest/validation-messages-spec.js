describe( 'Testing validation-messages.html', function () {

  var URL = 'End2EndTesting/Solutions/MainTest/validation-messages.html';
  beforeEach( function () {
    browser.get( URL );
  } );

  describe( 'At page load', function () {
    it( 'should find some customers at page load', function () {
      /*
       * Get a reference to the customers list
       * Check to see if it contains 'Around the Horn' and
       * 'White Clover Markets'
       */
      var customers = element.all( by.repeater( 'customer in customers' ) );

      expect( customers.getText() ).toContain( 'Around the Horn' );
      expect( customers.getText() ).toContain( 'White Clover Markets' );
    } );
  } );

  describe( 'Filtering tests', function () {
    var customerList, companyName, contactName, city, country;

    beforeEach( function () {
      /*
       * Set up the variables above as follows:
       * customerList: the customers list
       * companyName: the company name filter field
       * contactName: the contact name filter field
       * city: The city drop-down
       * country: The country drop-down
       */
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
      /*
       * Write a test to see if the filter for contact name
       * works correctly
       */
      contactName.sendKeys('A');
      expect( customerList.count() ).toBe( 10 );
      expect( customerList.getText() ).toContain( 'Eastern Connection' );
    });

    it('should filter by city', function() {
      /*
       * Write a test to see if the filter for city works correctly
       */
      city.sendKeys( 'Buenos' );
      expect( customerList.count() ).toBe( 3 );
      expect( customerList.getText() ).toContain( 'Rancho grande' );
    });

    it('should toggle cities based on country selection', function() {
      /*
       * Write a test to check that when the country is chose, the city
       * list shrinks to only that country's cities.
       * This requires two expectations
       * 1) Does the city drop-down contain a city for this country?
       * 2) Does the city drop-down NOT contain a city from another country?
       */
      country.sendKeys( 'Belgium' );
      var cities = city.getText();
      expect( cities ).toContain( 'Bruxelles' );
      expect( cities ).not.toContain( 'London' );
    });

  } )
} );

