describe('main Controller',function(){


	var ctrl,
		$scope,
		$rootScope,
		$routeParams,
		$q,
		portfolioData,
		$httpBackend;

	beforeEach(function(){
		module('portfolioApp');

		var $controller;



		inject(function(_$rootScope_,_$httpBackend_, _$controller_, _$routeParams_, _portfolioData_, _$q_){
			$rootScope = _$rootScope_;
			$scope = $rootScope.$new();
			$controller = _$controller_;
			$routeParams = _$routeParams_;
			portfolioData = _portfolioData_;
			$q = _$q_;
			$httpBackend = _$httpBackend_;
		});


		$httpBackend.whenGET(/\.html$/).respond('');

		ctrl = $controller('mainCtrl',{
			'portfolioData': portfolioData
		})


	})

	it('Should set the year for copyright',function(){
		var year = new Date().getFullYear();
		expect(ctrl.copyYear).toEqual(year)
	});


})