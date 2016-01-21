(function(){
	angular.module('portfolioApp')
		.directive('skill',[skillFunc])

	function skillFunc(){
		return {
			restrict: 'AE',
			replace: true,
			controller: skillCtrlFunc,
			controllerAs: 'skillCtrl',
			bindToController: true,
			scope: {
			    details: '='
			},
			templateUrl: "ng/partials/skill.html"
		}

		function skillCtrlFunc(){
			var self = this;

			if(typeof self.details == "string"){
				var temp = {skill: self.details};
				self.details = temp;
			}
		}
	}
})();