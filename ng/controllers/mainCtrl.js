(function(){
	angular.module('portfolioApp')
		.controller('mainCtrl',['portfolioData',mainCtrlFunc])


	function mainCtrlFunc(portfolioData){
		var self = this;
		self.copyYear = new Date().getFullYear();

		self.test = "Hi from Main Ctrl";




	}
})();
