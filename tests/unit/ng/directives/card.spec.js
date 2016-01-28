describe('Card Directive',function(){

	var $compile, $rootScope,element,ctrl;

	beforeEach(function(){
		module('portfolioApp');
		module('ng/partials/card.html');

		inject(function(_$compile_,_$rootScope_,_$controller_){
			$compile = _$compile_;
			$rootScope = _$rootScope_;
			$controller = _$controller_;
		});

 		element = angular.element("<card details='cardObj' featured='featuredObj' ></card>");  
		
	})

	it('Should build a URL for experience cards',function(){
		$rootScope.cardObj = {timeframe: '2012',url: 'test'};
		$compile(element)($rootScope);
		$rootScope.$digest();
		ctrl = element.isolateScope().cardCtrl;
		expect(ctrl.buildUrl(ctrl.details)).toEqual('/experiences/test/');
	})

	it('Should build a URL for project cards',function(){
		$rootScope.cardObj = {url: 'test2'};
		$compile(element)($rootScope);
		$rootScope.$digest();
		ctrl = element.isolateScope().cardCtrl;
		expect(ctrl.buildUrl(ctrl.details)).toEqual('/projects/test2/');
	})

	it('Should add a featured class if it within the featured tolerance',function(){
		$rootScope.cardObj = {url: 'test2'};
		$rootScope.featuredObj = 1;
		$compile(element)($rootScope);
		$rootScope.$digest();
		expect(element.hasClass('card--featured')).toEqual(true);
	})
})