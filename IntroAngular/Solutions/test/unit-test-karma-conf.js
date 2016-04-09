module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],

    files: [
      '../../../common/js/angular/angular.js',
      '../../../common/js/angular-mocks/angular-mocks.js',
      '../js/unit-test-controllers.js',
      'unit-test-specs.js'
    ],

    exclude: [
    ],

    preprocessors: {
    },

    reporters: ['mocha'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ['Chrome'],

    singleRun: false
  });
};
