(function(){
	angular.module('portfolioApp')
		.controller('skillCtrl',['$routeParams', 'portfolioData', skillCtrlFunc])


	function skillCtrlFunc($routeParams, portfolioData){
		var self = this;

		portfolioData.getSkill($routeParams.skill)
			.then(function(data){
				self.skillTitle = $routeParams.skill.replace(/-/g,' ');
				self.skillWork = data;
			})

	}
})();
