(function(){
	angular.module('portfolioApp')
		.controller('mainCtrl',[mainCtrlFunc])


	function mainCtrlFunc(){
		var self = this;
		self.copyYear = new Date().getFullYear();

	}
})();
