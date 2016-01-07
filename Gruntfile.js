module.exports = function(grunt){




//### SASS ###//

	var sassFiles = {'build/css/remind.min.css' : ['sass/portfolioMain.scss']};

	grunt.config('sass', {
        'css' : {
            options : {
                style : 'compressed',
                
            },
            files : sassFiles
        },
    });



//### UGLIFY ###//

	var ngFiles = {'build/ng/portfolio.ng.min.js' : ['ng/portfolipApp.js', 'ng/**/*.js']};

	grunt.config('uglify', {
	    'ng' : {
	        options : {
	            mangle   : false,
	            compress : {},
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
	    }
	}

	var defaultTasks = ['watch:sass','watch:ng'];

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



//### NPM ###//

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concurrent');


	grunt.registerTask('default',['concurrent']);

};