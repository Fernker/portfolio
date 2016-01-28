describe('experience Controller',function(){


	var ctrl,
		$scope,
		$rootScope,
		$routeParams,
		$q,
		portfolioData,
		experience,
		$httpBackend;

	beforeEach(function(){
		module('portfolioApp');

		var $controller;

		experience = {experience:'experiences'}

		inject(function(_$rootScope_,_$httpBackend_, _$controller_, _$routeParams_, _portfolioData_, _$q_){
			$rootScope = _$rootScope_;
			$scope = $rootScope.$new();
			$controller = _$controller_;
			$routeParams = _$routeParams_;
			portfolioData = _portfolioData_;
			$q = _$q_;
			$httpBackend = _$httpBackend_;
		});

		spyOn(portfolioData,'getExperience').and.returnValue($q.when(experience))

		$httpBackend.whenGET(/\.html$/).respond('');

		ctrl = $controller('experienceCtrl',{
			'$routeParams': $routeParams,
			'portfolioData': portfolioData
		})


	})

	it('Should get an experience object and put it on scope',function(){
		$rootScope.$digest();
		expect(ctrl.experience).toEqual(experience)
	})
})