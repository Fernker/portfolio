describe('project Controller',function(){


	var ctrl,
		$scope,
		$rootScope,
		$routeParams,
		$q,
		portfolioData,
		project,
		$httpBackend;

	beforeEach(function(){
		module('portfolioApp');

		var $controller;

		project = {project:'projectData'}

		inject(function(_$rootScope_,_$httpBackend_, _$controller_, _$routeParams_, _portfolioData_, _$q_){
			$rootScope = _$rootScope_;
			$scope = $rootScope.$new();
			$controller = _$controller_;
			$routeParams = _$routeParams_;
			portfolioData = _portfolioData_;
			$q = _$q_;
			$httpBackend = _$httpBackend_;
		});

		spyOn(portfolioData,'getProject').and.returnValue($q.when(project))

		$httpBackend.whenGET(/\.html$/).respond('');

		ctrl = $controller('projectCtrl',{
			'$routeParams': $routeParams,
			'portfolioData': portfolioData
		})


	})

	it('Should get a project object and put it on scope',function(){
		$rootScope.$digest();
		expect(ctrl.project).toEqual(project)
	})
})