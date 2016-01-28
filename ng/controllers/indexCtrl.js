(function(){
	angular.module('portfolioApp')
		.controller('indexCtrl',['portfolioData',indexCtrlFunc])


	function indexCtrlFunc(portfolioData){
		var self = this;

		portfolioData.getPortfolio()
			.then(function(data){

				self.portfolio = data;
			})




	}
})();
