describe('directive-module.js', function() {
  var $compile, $rootScope;

  beforeEach(function() {
    module( 'directiveModule' );

    inject(function(_$compile_, _$rootScope_) {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
    });
  });

  it ('Provides a customized footer', function() {
    var element = $compile('<nwt-footer></nwt-footer>')($rootScope);
    $rootScope.$digest();
    expect( element.html() ).toContain( 'Northwind Trading Company' );
    expect( element.html() ).toContain( '2015' );
  })


});
