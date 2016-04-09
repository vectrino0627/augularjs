// See https://github.com/angular/protractor/blob/master/docs/referenceConf.js for details

exports.config = {
  seleniumAddress   : 'http://localhost:4444/wd/hub',
  specs             : ['protractor-spec.js', 'better-protractor-spec.js'],

  // Exclude files if needed
  exclude: [],

  // A base URL for your application under test. Calls to protractor.get()
  // with relative paths will be prepended with this.
  baseUrl: 'http://localhost:8000',

  // CSS Selector for the element housing the angular app - this defaults to
  // body, but is necessary if ng-app is on a descendant of <body>.
  rootElement: 'html',


  // Test framework to use. This may be one of:
  // jasmine, jasmine2, cucumber, mocha or custom.
  //
  // Jasmine and Jasmine2 are fully supported as test and assertion frameworks.
  // Mocha and Cucumber have limited support. You will need to include your
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

  /*

  // Alternatively to specs[], suites may be used. When run without a command line
  // parameter, all suites will run. If run with --suite=smoke or
  // --suite=smoke,full only the patterns matched by the specified suites will
  // run.
  //suites: {
  //  smoke: 'spec/smoketests/!*.js',
  //  full: 'spec/!*.js'
  //},
*/

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
