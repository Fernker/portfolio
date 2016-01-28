describe('index Controller',function(){


	var ctrl,
		$scope,
		$rootScope,
		$routeParams,
		$q,
		portfolioData,
		portfolio,
		$httpBackend;

	beforeEach(function(){
		module('portfolioApp');

		var $controller;

		portfolio = {
			a: [
				{experience: 'experience1'},
				{experience: 'experience2'},
				{experience: 'experience3'}
			]
		}

		inject(function(_$rootScope_,_$httpBackend_, _$controller_, _$routeParams_, _portfolioData_, _$q_){
			$rootScope = _$rootScope_;
			$scope = $rootScope.$new();
			$controller = _$controller_;
			$routeParams = _$routeParams_;
			portfolioData = _portfolioData_;
			$q = _$q_;
			$httpBackend = _$httpBackend_;
		});

		spyOn(portfolioData,'getPortfolio').and.returnValue($q.when(portfolio))

		$httpBackend.whenGET(/\.html$/).respond('');

		ctrl = $controller('indexCtrl',{
			'portfolioData': portfolioData
		})


	})

	it('Should get a portfolio object',function(){
		$rootScope.$digest();
		expect(ctrl.portfolio).toEqual(portfolio)
	});


})