(function(){
	angular.module('portfolioApp')
		.directive('card',[cardFunc])

	function cardFunc(){
		return {
			restrict: 'AE',
			replace: true,
			controller: cardCtrlFunc,
			controllerAs: 'cardCtrl',
			bindToController: true,
			scope: {
			    details: '=',
			    featured: '@'
			},
			templateUrl: "ng/partials/card.html"
		}

		function cardCtrlFunc(){
			var self = this;


			self.buildUrl = function(item){
				///{{cardCtrl.url}}/{{cardCtrl.details.url}}/
				var url = "/";
				if(item.timeframe){
					url += 'experiences';
				}else{
					url += 'projects'
				}
				url += '/'+ item.url + '/';
				return url;
			}
		}
	}
})();