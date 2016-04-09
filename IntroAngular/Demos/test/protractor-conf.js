// See https://github.com/angular/protractor/blob/master/docs/referenceConf.js for details

exports.config = {
  seleniumAddress   : 'http://localhost:4444/wd/hub',
  specs             : ['protractor-tests.js'],

  // Test framework to use. This may be one of:
  // jasmine, jasmine2, cucumber, mocha or custom.
  //
  // Jasmine is fully supported as a test and assertion framework.
  // Mocha and Cucumber have limited beta support. You will need to include your
  // own assertion framework (such as Chai) if working with Mocha.
  framework         : 'jasmine2',

  // Options to be passed to jasmine2.
  //
  // See https://github.com/jasmine/jasmine-npm/blob/master/lib/jasmine.js
  // for the exact options available.
  jasmineNodeOpts: {
    // If true, print colors to the terminal.
    showColors: true,
    // Default time to wait in ms before a test fails.
    defaultTimeoutInterval: 30000
    ,print: function() {}
  },

  onPrepare: function() {
    var SpecReporter = require('jasmine-spec-reporter');
    // add jasmine spec reporter
    jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: true}));
  },

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
