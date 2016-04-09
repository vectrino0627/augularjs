// See https://github.com/angular/protractor/blob/master/docs/referenceConf.js for details

exports.config = {
  seleniumAddress   : 'http://localhost:4444/wd/hub',
  specs             : ['highlight-match-async.protractor-spec.js'],

  // Where should we find Firefox. If unspecified, look in the "usual" places
  // firefoxPath: null,

  // Test framework to use. This may be one of:
  // jasmine, jasmine2, cucumber, mocha or custom.
  //
  // When the framework is set to "custom" you'll need to additionally
  // set frameworkPath with the path relative to the config file or absolute
  // framework: 'custom',
  // frameworkPath: './frameworks/my_custom_jasmine.js',
  // See github.com/angular/protractor/blob/master/lib/frameworks/README.md
  // to comply with the interface details of your custom implementation.
  //
  // Jasmine is fully supported as a test and assertion framework.
  // Mocha and Cucumber have limited beta support. You will need to include your
  // own assertion framework (such as Chai) if working with Mocha.
  framework         : 'jasmine',

  // An array of capability objects
  multiCapabilities : [
    {
      browserName : 'chrome'

      // Add another set of specs for this browser only
      // specs: []
    }/*,

    // Should, in theory, run parallel tests in Chrome and FF
    {
      browserName : 'firefox'
    }*/
  ]
};
