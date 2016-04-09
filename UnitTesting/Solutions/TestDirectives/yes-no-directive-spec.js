describe( 'yes-no-directive.js', function () {
  var $compile, $rootScope;

  beforeEach( function () {
    // Load the glyphDirectives module
    module( 'glyphDirectives' );

    // Write an injector to bring in the $compile and $rootScope services
    // Add a property to rootScope: testModel, it should be an object with
    // two properties: $invalid, set to true, and foo, set to 'bar'
    inject( function ( _$compile_, _$rootScope_ ) {
      $compile = _$compile_;
      $rootScope = _$rootScope_;

      $rootScope.testModel = {
        $invalid : true,
        foo: 'bar'
      };
    } );
  } );

  it('should generate appropriate output', function() {
    /*
     * Write a test around the above assertion.
     * You only need to check to see if the generated HTML has the string
     * 'glyphicon' in it
     */
    var element = $compile( '<yes-no aa-model="testModel" aa-property="$invalid"></yes-no>' )( $rootScope );
    $rootScope.$digest();
    expect( element.html() ).toContain( 'glyphicon' );
  });

  it('should show a checkmark', function() {
    /*
     * Write a test to see if a checkmark is added under the right conditions
     * Look to the HTML to see if it contains the string 'glyphicon-ok'
     */
    var element = $compile( '<yes-no aa-model="testModel" aa-property="$invalid"></yes-no>' )( $rootScope );
    $rootScope.$digest();
    expect( element.html() ).toContain( 'glyphicon-ok' );
  });

  it('should show an X', function() {
    /*
     * Write a test to see if a checkmark is added under the right conditions
     * Look to the HTML to see if it contains the string 'glyphicon-remove'
     * You'll need to set the $invalid property of testModel to false
     */
    $rootScope.testModel.$invalid = false;

    var element = $compile( '<yes-no aa-model="testModel" aa-property="$invalid"></yes-no>' )( $rootScope );
    $rootScope.$digest();
    expect( element.html() ).toContain( 'glyphicon-remove' );
  })
} );