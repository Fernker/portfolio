describe('Portfolio Data Factory',function(){

	var $rootScope, $http,  $httpBackend, srvc, requestObj,result;

	beforeEach(module('portfolioApp'));

	beforeEach(inject(function(_$rootScope_,_$http_,_$httpBackend_,_portfolioData_){
		$rootScope = _$rootScope_;
		$httpBackend = _$httpBackend_;
		$http = _$http_;
		srvc = _portfolioData_;

		result = {
			a: [
				{
					url: 'testUrl',
					skills: ["test skill","mad skills"]
				}
			],
			b: [
				{
					url: 'testProjectUrl',
					skills: ["cool skill","mad skills"]

				},
				{
					url: 'skillWeights',
					skills: ['GruntJS','jQuery','Unit Tests','JavaScript','CSS3','AngularJS','HTML5','JasmineJS','Karma','Django']
				}
			]
		}


		$httpBackend.whenGET(/\.html$/).respond('');
		var requestObj = $httpBackend.whenGET(/data\/port\.json/).respond(result);

	}));

	afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });


	describe("Portfolio Object",function(){
		it('Should get a portfolio object',function(){
			srvc.getPortfolio()
				.then(function(data){
					expect(data).toBeDefined();
				})
			$httpBackend.flush();
			$rootScope.$digest();
		})

		it('Should combine experiences and projects into an everything array',function(){
			srvc.getPortfolio()
				.then(function(data){
					var expectation = [];
					expectation = expectation.concat(result.a);
					expectation = expectation.concat(result.b);
					expect(data.everything).toEqual(expectation)
				})
			$httpBackend.flush();
			$rootScope.$digest();
		})

		it('Should not re-request portfolio if it already has it',function(){
			srvc.getPortfolio()
				.then(function(data){
					result.a = [{change: 'changes'}]; //This should have no effect since it won't do a $httpRequest again

					return srvc.getPortfolio();
				})
				.then(function(data){
					expect(data.a[0]).toEqual({url: 'testUrl',skills: ["test skill","mad skills"]}); 
				})
			$httpBackend.flush();
			$rootScope.$digest()
		})

		describe("Skills generation and ranking",function(){

			it("should count the frequency of the skills",function(){
				srvc.getPortfolio()
					.then(function(data){
						expect(data.skills[10]).toEqual({ skill: 'mad skills', count: 2 })
					})
				$httpBackend.flush();
				$rootScope.$digest();
			})

			it("should give more weight to certain skills",function(){
				srvc.getPortfolio()
					.then(function(data){
						expect(data.skills[0]).toEqual({skill: 'AngularJS',count: 520});
						expect(data.skills[2]).toEqual({skill: 'GruntJS',count: 498});
						expect(data.skills[7]).toEqual({skill: 'JasmineJS',count: 493});
					})
				$httpBackend.flush();
				$rootScope.$digest();
			})
		})
	})



	it('Should get an experience object based on a matching url',function(){
		srvc.getExperience('testUrl')
			.then(function(data){
				expect(data).toEqual(result.a[0]);
			})
		$httpBackend.flush();
		$rootScope.$digest();
	})


	it("Should get a project object based on a matching url",function(){
		srvc.getProject('testProjectUrl')
			.then(function(data){
				expect(data).toEqual(result.b[0]);
			})
		$httpBackend.flush();
		$rootScope.$digest();
	})


	it("Should get an array of items based on a skill",function(){
		srvc.getSkill('mad-skills')
			.then(function(data){
				expect(data).toEqual([result.a[0],result.b[0]])
			})
		$httpBackend.flush();
		$rootScope.$digest();
	})



})




