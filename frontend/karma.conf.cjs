module.exports = function(config) {
	config.set({
		basePath: '',
        // start these browsers
        // available browser launchers: https://www.npmjs.com/search?q=keywords:karma-launcher
        browsers: ['ChromeHeadless'],
		// available frameworks: https://www.npmjs.com/search?q=keywords:karma-adapter
		frameworks: ['jasmine', 'karma-typescript', '@angular-devkit/build-angular'],
		plugins: [
			'karma-jasmine',
			'karma-typescript',
            'karma-esbuild',
			'karma-chrome-launcher',
			'karma-coverage',
            'karma-spec-reporter',
			'@angular-devkit/build-angular/plugins/karma',
		],
        karmaTypescriptConfig: {
            tsconfig: './tsconfig.spec.json',
        },
        esbuild: {
            target: 'es2022'
        },
        client: {
            jasmine: {
                random: false,
                clearContext: false,
            }
        },
        // Do not include this if using @angular-devkit/build-angular framework is being used, as things will run twice and in an inconsistent way
        //files: ['src/app/**/*.spec.ts'],
        exclude: ["node_modules"],
		// preprocess matching files before serving them to the browser
		// available preprocessors: https://www.npmjs.com/search?q=keywords:karma-preprocessor
        preprocessors: {
            'src/**/*.ts': ['esbuild'],
        },
		// available reporters: https://www.npmjs.com/search?q=keywords:karma-reporter
		reporters: ['spec', 'coverage'],
        coverageReporter: {
            dir: 'coverage',
            subdir: '.',
            reporters: [
                { type: 'html' },
                { type: 'text-summary' },
            ]
        },
		// web server port
		port: 9876,
		// enable / disable colors in the output (reporters and logs)
		colors: true,
		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,
        browserConsoleLogOptions: {
            level: 'debug',
            format: '%b %T: %m',
            terminal: true
        },
		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: false,
		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: true,
		// Concurrency level
		// how many browser instances should be started simultaneously
		concurrency: 1
	});
};
