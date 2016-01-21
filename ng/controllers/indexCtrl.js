(function(){
	angular.module('portfolioApp')
		.controller('indexCtrl',['portfolioData',indexCtrlFunc])


	function indexCtrlFunc(portfolioData){
		var self = this;

		portfolioData.getPortfolio()
			.then(function(data){

				self.portfolio = data;

				//Top 2 are featured
				self.portfolio.a[0].featured = true;
				self.portfolio.a[1].featured = true;
			})




	}
})();
