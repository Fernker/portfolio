

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
                controller: 'indexCtrl',
                controllerAs: 'indexCtrl',
            })
            .when('/experiences/:experienceUrl/',{
                templateUrl: 'ng/views/experience.html',
                controller: 'experienceCtrl',
                controllerAs: 'experienceCtrl'
            })
            .when('/projects/:projectUrl/',{
                templateUrl: 'ng/views/project.html',
                controller: 'projectCtrl',
                controllerAs: 'projectCtrl'
            })
            .when('/skills/:skill/',{
                templateUrl: 'ng/views/skill.html',
                controller: 'skillCtrl',
                controllerAs: 'skillCtrl'
            })


            .otherwise({
                redirectTo: '/'
            });
    }])

    .run(['$rootScope','$location','$window',function($rootScope,$location,$window){
        $window.ga('create','UA-74460275-1','auto');
        $rootScope.$on('$routeChangeSuccess',function(){
            ga('send','pageview',$location.path());
        })
    }])
    
// .config(function($resourceProvider) {
//   $resourceProvider.defaults.stripTrailingSlashes = false;
// })
//.run(['$route', angular.noop]);;

