describe('complex-directive-module.js', function() {
  var $compile, $rootScope, dateFilter;

  beforeEach(function() {
    module( 'directiveModule' );
    module('tpls');

    inject(function(_$compile_, _$rootScope_, _dateFilter_ ) {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
      dateFilter = _dateFilter_;
    });
  });

  it ('should take a string as an argument', function() {
    // Note that Chrome is different from FF (maybe IE, too)
    var dateString = '2015-04-21EDT';
    var day = dateFilter( new Date(dateString), 'EEEE' );

    var element = $compile('<day-display today="2015-04-21"></day-display>')($rootScope);
    $rootScope.$digest();
    expect( element.html() ).toContain( day );
  });

  it('should take a date object as an argument', function() {
    var dateString = '2015-04-21EDT',
        today = new Date(dateString ),
        day = dateFilter( today, 'EEEE' );

    $rootScope.fooDate = today;
    var element = $compile('<day-display todayRef="fooDate"></day-display>')($rootScope);
    $rootScope.$digest();
    expect( element.html() ).toContain( day );
  });

  it('should use today if a date is not provided', function() {
    var dateString = '2015-04-21EDT',
        today = new Date(dateString ),
        day = dateFilter( today, 'EEEE' );

    var element = $compile('<day-display></day-display>')($rootScope);
    $rootScope.$digest();
    expect( element.html() ).toContain( day );

  });

});
