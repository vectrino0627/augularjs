exports.config = {
  seleniumAddress : 'http://localhost:4444/wd/hub',
  specs           : ['e2e-mock-controller-http-spec.js'],
  baseUrl: 'http://localhost:8000/',

  framework       : 'jasmine2',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
    ,print: function() {}
  },

  onPrepare: function() {
    var SpecReporter = require('jasmine-spec-reporter');
    jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: true}));
  },

  multiCapabilities : [
    {
      browserName : 'chrome'
    }
  ]
};
