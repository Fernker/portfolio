

angular.module('portfolioApp', ['ngSanitize','ngRoute'])
	.constant( 'AppConfig', {

	} )
    .config(['$sceDelegateProvider', function($sceDelegateProvider) {
        // $sceDelegateProvider.resourceUrlWhitelist([
        //     'self',
        //     'http://*.renderedmouse.com/**',
        //     'https://*.renderedmouse.com/**'
        // ]);
    }])
    .config(['$locationProvider',function($locationProvider){
    	$locationProvider.html5Mode(true);
    	$locationProvider.hashPrefix('!');
    }])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider


            //Student related URLs
            .when('/',{
                templateUrl: 'ng/views/index.html',
                //controller: 'loginCtrl',
                //controllerAs: 'loginCtrl',
            })

    //         .when('/app',{
    //         	templateUrl: '/static/ng/views/app.html',
    //         	controller: 'appCtrl',
    //         	controllerAs: 'appCtrl',
    //         	resolve: {
				// 	auth: function(loginFactory){
				// 		return loginFactory.checkAuth()
				// 	}
				// }
    //         })
            .otherwise({
                redirectTo: '/'
            });
    }])
    
// .config(function($resourceProvider) {
//   $resourceProvider.defaults.stripTrailingSlashes = false;
// })
.run(['$route', angular.noop]);;

