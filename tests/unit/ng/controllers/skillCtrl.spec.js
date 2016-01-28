describe('skill Controller',function(){


	var ctrl,
		$scope,
		$rootScope,
		$routeParams,
		$q,
		portfolioData,
		skill,
		$httpBackend;

	beforeEach(function(){
		module('portfolioApp');

		var $controller;

		skill = {skill:'skillData'}

		inject(function(_$rootScope_,_$httpBackend_, _$controller_, _$routeParams_, _portfolioData_, _$q_){
			$rootScope = _$rootScope_;
			$scope = $rootScope.$new();
			$controller = _$controller_;
			$routeParams = _$routeParams_;
			portfolioData = _portfolioData_;
			$q = _$q_;
			$httpBackend = _$httpBackend_;
		});

		spyOn(portfolioData,'getSkill').and.returnValue($q.when(skill))

		$httpBackend.whenGET(/\.html$/).respond('');

		ctrl = $controller('skillCtrl',{
			'$routeParams': $routeParams,
			'portfolioData': portfolioData
		})


	})

	it('Should get an experience object and put it on scope',function(){
		$routeParams.skill = 'skill-title';
		$rootScope.$digest();
		expect(ctrl.skillWork).toEqual(skill);
		expect(ctrl.skillTitle).toEqual('skill title');
	})
})