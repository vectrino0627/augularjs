
// This does not work
describe('Testing asynchronous interactions without mocks', function() {
  var p, employeeList;
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  beforeEach(function(done) {
    inject(function($http, $httpBackend) {
      p = $http.get('http://localhost:8001/northwind/employees/1');
      console.info( $http );
      p.success(function(data) {
        console.log( 'Executing success callback' );
        employeeList = data;
        done();
      });

      $httpBackend.flush();
    });
  });

  it('should have nine (9) employees', function(/*done*/) {
    expect( employeeList.length ).toBe( 1 );
    //done();
  })
});
