(function(){
	angular.module('portfolioApp')
		.directive('photoGallery',[photoGalleryFunc])

	function photoGalleryFunc(){
		return {
			restrict: 'AE',
			replace: true,
			controller: ['$document','$scope','$q', photoGalleryCtrlFunc],
			controllerAs: 'photoGalleryCtrl',
			bindToController: true,
			scope: {
			    gallery: '='
			},
			templateUrl: "ng/partials/photoGallery.html"
		}

		function photoGalleryCtrlFunc($document,$scope,$q){
			var self = this;

			self.index;
			self.viewingImage = {};


			function loadImage(url){
				var deferred = $q.defer();
				var image = new Image();

				image.onload = function(){
					self.loading = false;
					if(typeof this.complete === false || this.naturalWidth === 0){
						console.log('wut?');
						deferred.reject();
					}
					deferred.resolve(image);
				}

				image.onerror = function(){
					deferred.reject();
				}

				image.src = url;
				self.loading = true;
				return deferred.promise;
			}

			function getImage(index){
				var request = self.gallery[index];
				loadImage(request.url)
					.then(function(image){
						self.viewingImage = request;
						self.error = false;
					},function(){
						self.error = true;
					})
			}


			self.showImage = function(index){

			}

			self.openGallery = function(index){
				self.index = index;

				self.open = true;

				//self.viewingImage = self.gallery[index];
				getImage(index);
			}

			self.closeGallery = function(){
				self.open = false;
			}

			self.switchImage = function(increment){
				self.index = self.index + increment;
				if(self.index < 0){
					self.index = self.gallery.length - 1;
				}else if(self.index === self.gallery.length){
					self.index = 0;
				}
				getImage(self.index);
			}

			angular.element($document[0].body).on('keydown',function(e){
				if(!self.open){return;}

				var key = e.which;
				if(key === 27){
					self.closeGallery();
				}else if(key === 39){
					self.switchImage(1);
				}else if(key === 37){
					self.switchImage(-1);
				}
				$scope.$apply();
			})


		}
	}
})();