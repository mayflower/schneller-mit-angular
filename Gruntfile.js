var isWin = /Windows/.test(require('os').type()),
    phantomLibDir = __dirname + '/node_modules/phantomjs/lib/phantom/';

// set PHANTOMJS_BIN for karma
process.env.PHANTOMJS_BIN =  phantomLibDir + (isWin ? 'phantomjs.exe' : 'bin/phantomjs');

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        karma: {
            options: {
                // does not serve any purpose but to fix a grunt-karma error
                configFile: 'node_modules/grunt-karma/karma.conf.js',
                // setting urlRoot to /base/ serves e2e browser().navigateTo calls relative to basePath
                urlRoot: '/base/',
                basePath: __dirname,
                singleRun: true,
                autoWatch: false,
                logLevel: 'info',
                exclude: [
                  '**/*.min.js'
                ]
            },
            "e2e-dev": {
                options: {
                    files: [
                        'node_modules/karma/adapter/lib/angular-scenario.js',
                        'node_modules/karma/adapter/angular-scenario.js',
                        //watch for reload and serve but do NOT include into testing frame with a script tag
                        {pattern: 'components/**/*.js', included: false},
                        {pattern: '**/*.html', included: false},
                        {pattern: '**/*.css', included: false},
                        'src/**/*.js',
                        'test/e2e/**/*.js'
                    ],
                    browsers: ['PhantomJS'],
                    singleRun: false,
                    autoWatch: true
                }
            },
            "unit-dev": {
                options: {
                    files: [
                      'node_modules/karma/adapter/lib/jasmine.js',
                      'node_modules/karma/adapter/jasmine.js',
                      //watch for reload and serve but do NOT include into testing frame with a script tag
                      {pattern: '**/*.html', included: false},
                      'components/angular/angular.js',
                      'components/**/*.js',
                      'src/**/*.js',
                      'test/unit/**/*.js'
                    ],
                    browsers: ['PhantomJS'],
                    singleRun: false,
                    autoWatch: true
                }
            }
        },
        mkdir: {
            all: { options: { create: ['src', 'test/e2e', 'test/unit'] } }
        }
    });


    // Default task(s).
    grunt.registerTask('test:unit-dev', ['karma:unit-dev']);
    grunt.registerTask('test:e2e-dev',  ['karma:e2e-dev']);

    grunt.registerTask('setup', ['mkdir:all']);

    // Load the plugins provided by npm
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-mkdir');
};
