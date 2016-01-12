(function(){
	angular.module('portfolioApp')
		.controller('projectCtrl',['$routeParams', 'portfolioData',projectCtrlFunc])


	function projectCtrlFunc($routeParams, portfolioData){
		var self = this;

		portfolioData.getProject($routeParams.projectUrl)
			.then(function(data){
				self.project = data;
			})

	}
})();
