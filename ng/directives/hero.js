(function(){
	angular.module('portfolioApp')
		.directive('hero',[heroFunc])

	function heroFunc(){
		return {
			restrict: 'E',
			controller: heroCtrlFunc,
			controllerAs: 'heroCtrl',
			bindToController: true,
			scope: {
				slider: '='
			},
			templateUrl: "ng/partials/hero.html",
			link: heroLinkFunc
		}

		function heroCtrlFunc(){

		}

		function heroLinkFunc(scope, ele, attrs, ctrl){
			//console.log(ele[0].children[1].offsetHeight);
			var slider = false, sliderNew = false;
			angular.element(document).on('scroll',function(e){
				if(window.pageYOffset > ele[0].offsetHeight){
					sliderNew = true;
				}else{
					sliderNew = false;
				}
				if(slider != sliderNew){
					slider = sliderNew;
					scope.$apply(function(){
						ctrl.slider = sliderNew;
					})
					console.log(slider);
				}
				//console.log(window.pageYOffset, ele[0].children[1].offsetHeight);
			})
		}
	}
})();