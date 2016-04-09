describe( 'Testing controller-http.html', function () {

  var URL = 'End2EndTesting/Demos/E2EMock/e2e-mock-controller-http.html';

  describe( 'Testing name filter', function () {
    var cityList;

    beforeEach( function () {
      browser.get( URL );
      cityList = element.all(by.repeater('city in cities'));
    } );

    it( 'should see five cities', function () {
      expect( cityList.count() ).toBe( 5 );
    } );

    it('should filter the cities', function() {
      var filterCity = element( by.model( 'filterCity' ) );
      filterCity.sendKeys( 'al' );

      expect( cityList.count() ).toBe( 1 );
      expect( cityList.getText() ).toContain( 'Baltimore' );
    })
  } );

} );

