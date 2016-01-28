module.exports = function(grunt){




//### SASS ###//

	var sassFiles = {'build/css/portfolio.min.css' : ['sass/portfolioMain.scss']};

	grunt.config('sass', {
        'css' : {
            options : {
                style : 'compressed',
                
            },
            files : sassFiles
        },
    });



//### UGLIFY ###//

	var ngFiles = {'build/ng/portfolio.ng.min.js' : ['ng/portfolioApp.js', 'ng/**/*.js']};

	grunt.config('uglify', {
	    'ng' : {
	        options : {
	            mangle   : false,
	            compress : false,
	            beautify : false
	        },
	        files : ngFiles
	    }
	});

//### WATCH / CONCURRENT ###//


	var options = {
	    atBegin: true,
	    spawn: true,
	    debounceDelay: 250,

	};

	var taskConfig = {
	    'sass' : {
	        tasks   : ['sass:css'],
	        files   : ['sass/**/*.scss'],
	        options : options
	    },
	    'ng' : {
	        tasks   : ['uglify:ng'],
	        files   : ['ng/**/*.js'],
	        options : options
	    },
	    'specs': {
	    	tasks : ['karma:unit:run'],
	    	files : ['tests/unit/**/*.js'],
	    	options: options
	    }
	}

	var defaultTasks = ['watch:sass','watch:ng','watch:specs'];

	grunt.config('watch', taskConfig );
	grunt.config('concurrent', {
	        'smart-watch' : {
	            tasks: defaultTasks,
	            options: {
	                logConcurrentOutput: true
	            }
	        }
	    }
	);


	// Image resize //

	grunt.config('imagemagick-resize',{
		image: {

     		 from:'images/shots/src/',
		 	    to:'images/shots/full/',
		 	    files:'*',
		 	    props:{
		 	      width:1000,
		 	      height: 1000
		 	    }
		    },
		thumb: {
		    from:'images/shots/full/',
		 	    to:'images/shots/thumb/',
		 	    files:'*',
		 	    props:{
		 	      width:200,
		 	      height: 200
		 	    }
		    },

	})


//### KARMA ###//

	grunt.config('karma', {
	    options : {
	        logLevel: 'ERROR',
	        
	        port: 9897,
	        plugins : [
	            'karma-coverage',
	            'karma-jasmine',
	            'karma-firefox-launcher',
	            'karma-mocha-reporter',
	            'karma-ng-html2js-preprocessor'
	        ],
	        reporters : ['mocha'],
	        mochaReporter : {
	            output : 'full'
	        },
	        frameworks : [
	            'jasmine'
	        ],
	        browsers : [
	            'Firefox'
	        ],
	        preprocessors : {
	        	'ng/partials/*.html':['ng-html2js']
	         },
	        files : [
	        	'js/lib/lodash.min.js',
	        	'https://ajax.googleapis.com/ajax/libs/angularjs/1.4.9/angular.js',
	        	'https://code.angularjs.org/1.4.2/angular-sanitize.js',
	        	'https://code.angularjs.org/1.4.2/angular-route.js',
	        	'https://code.angularjs.org/1.4.9/angular-mocks.js',
	            'build/ng/portfolio.ng.min.js',
	            
	            'ng/portfolioApp.js',
	            'ng/**/**/*.js',
	            'tests/unit/**/*.spec.js',
	            'ng/partials/*.html'
	        ]
	    },
	    unit : {
	        singleRun : false,
	        background : true,
	        reporters : ['mocha'],
	        mochaReporter: {
	            output: 'minimal'
	        },
	    },
	    build : {
	        singleRun : true,
	        background: false,
	        reporters : ['mocha', 'coverage'],
	        browsers : ['Firefox'],
	        preprocessors : {
	            'ng/**/**/**/*.js' : ['coverage']
	         
	        },
	        mochaReporter: {
	            output: 'minimal'
	        },
	        coverageReporter : {
	            reporters:  [
	                {
	                    type : 'html',
	                    dir: 'tests/results/coverage'
	                },
	                {
	                    type : 'text-summary'
	                }
	            ]
	        }
	    }
	});


	




//### NPM ###//

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-karma');

    grunt.loadNpmTasks('grunt-imagemagick');
    
    



	grunt.registerTask('default',['karma:unit:start', 'concurrent']);
	grunt.registerTask('image',['imagemagick-resize:image','imagemagick-resize:thumb'])
	grunt.registerTask('coverage',['karma:build']);
};