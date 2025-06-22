module.exports = function(config) {
    config.set({
        frameworks: ['jasmine'],
        files: [
            'src/**/*.js',
            'test/**/*.spec.js'
        ],
        browsers: ['Chrome'],
        reporters: ['progress'],
        singleRun: true
    });
};