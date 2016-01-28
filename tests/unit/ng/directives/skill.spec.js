describe('Skill Directive',function(){

	var $compile, $rootScope,element, skillObj, isoScope,ctrl;

	beforeEach(function(){
		module('portfolioApp');
		module('ng/partials/skill.html');

		inject(function(_$compile_,_$rootScope_,_$controller_){
			$compile = _$compile_;
			$rootScope = _$rootScope_;
			$controller = _$controller_;
		});

 		element = angular.element("<skill details='skillObj'></skill>");  
		
	})

	it('Should create a skill object when a string is passed in',function(){
		$rootScope.skillObj = "Skill Title";
		$compile(element)($rootScope);
		$rootScope.$digest();
		ctrl = element.isolateScope().skillCtrl;
		expect(ctrl.details).toEqual({skill:"Skill Title"});
	})

	it('Should pass through a skill if it is an object',function(){
		$rootScope.skillObj = {skill: "test2",count:2};
		$compile(element)($rootScope);
		$rootScope.$digest();
		ctrl = element.isolateScope().skillCtrl;
		expect(ctrl.details).toEqual($rootScope.skillObj);
	})

	it('Should use the title to generate a link',function(){
		$rootScope.skillObj = "Skill Title";
		$compile(element)($rootScope);
		$rootScope.$digest();
		expect(angular.element(element).attr("href")).toEqual('/skills/Skill-Title/')
	})

	

	
})