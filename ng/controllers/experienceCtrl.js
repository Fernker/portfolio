(function(){
	angular.module('portfolioApp')
		.controller('experienceCtrl',['$routeParams', 'portfolioData',experienceCtrlFunc])


	function experienceCtrlFunc($routeParams, portfolioData){
		var self = this;
		self.test = $routeParams;

		portfolioData.getExperience($routeParams.experienceUrl)
			.then(function(data){
				self.experience = data;
			})

	}
})();
