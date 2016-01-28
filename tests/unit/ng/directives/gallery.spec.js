describe('Photo Gallery Directive',function(){

	var $compile, $rootScope,element,ctrl,dummyImage,triggerKeyDown,document;

	var screens = [
		"Comment1",
		"Comment2"
	];
	var prefix = 'unitTests';

	dummyImage = {};

	

	beforeEach(function(){
		module('portfolioApp');
		module('ng/partials/photoGallery.html');

		inject(function(_$compile_,_$rootScope_,_$controller_,_$document_){
			$compile = _$compile_;
			$rootScope = _$rootScope_;
			$controller = _$controller_;
			$document = _$document_;
		});

		spyOn(window,'Image').and.returnValue(dummyImage)


 		element = angular.element("<photo-gallery gallery='screens' prefix='{{prefix}}' />");  
		$rootScope.prefix = prefix;
		$rootScope.screens = screens;


		triggerKeyDown = function ( keyCode) {
		    // var e = angular.element.Event('keydown')
		    // e.which = keyCode;
		    // element.trigger(e);

		    var e = new window.KeyboardEvent('keydown', {
			  bubbles: true,
			  cancelable: true,
			  shiftKey: true
			});

			delete e.keyCode;
			Object.defineProperty(e, 'keyCode', {'value': keyCode});
			delete e.which;
			Object.defineProperty(e, 'which',{'value':keyCode});

			$document[0].body.dispatchEvent(e);
		  };
	})

	it('Should generate list of images from the provided screens',function(){
		$compile(element)($rootScope);
		$rootScope.$digest();
		ctrl = element.isolateScope().photoGalleryCtrl;
		expect(element.find('img').attr('ng-src')).toEqual('/images/shots/thumb/'+prefix+'1.png');
	})

	it('Should open the gallery and get the image',function(){
		$compile(element)($rootScope);
		$rootScope.$digest();
		ctrl = element.isolateScope().photoGalleryCtrl;
		ctrl.openGallery(0)
		$rootScope.$digest();
		dummyImage.onload();
		$rootScope.$digest();
		expect(ctrl.open).toEqual(true);
		expect(ctrl.viewingImage).toEqual('/images/shots/full/'+prefix+'1.png');
		expect(ctrl.error).toEqual(false);
	})

	it('Should set are error flag if the image cant load',function(){
		$compile(element)($rootScope);
		$rootScope.$digest();
		ctrl = element.isolateScope().photoGalleryCtrl;
		ctrl.openGallery(0)
		$rootScope.$digest();
		dummyImage.naturalWidth = 0;
		dummyImage.onload();
		$rootScope.$digest();
		expect(ctrl.error).toEqual(true);
	})

	it('Should set are error flag if the image errors',function(){
		$compile(element)($rootScope);
		$rootScope.$digest();
		ctrl = element.isolateScope().photoGalleryCtrl;
		ctrl.openGallery(0)
		$rootScope.$digest();

		dummyImage.onerror();
		$rootScope.$digest();
		expect(ctrl.error).toEqual(true);
	})

	it('Should close the gallery',function(){
		$compile(element)($rootScope);
		$rootScope.$digest();
		ctrl = element.isolateScope().photoGalleryCtrl;
		ctrl.closeGallery()
		$rootScope.$digest();
		expect(ctrl.open).toEqual(false);
	})

	it('Should increment the index',function(){
		$compile(element)($rootScope);
		$rootScope.$digest();
		ctrl = element.isolateScope().photoGalleryCtrl;
		ctrl.openGallery(0)
		ctrl.switchImage(1)
		$rootScope.$digest();
		expect(ctrl.index).toEqual(1);
	})

	it('Should reset the index to 0 when at end of gallery',function(){
		$compile(element)($rootScope);
		$rootScope.$digest();
		ctrl = element.isolateScope().photoGalleryCtrl;
		ctrl.openGallery(1)
		ctrl.switchImage(1)

		$rootScope.$digest();
		expect(ctrl.index).toEqual(0);
	})

	it('Should go to end of gallery if past spot 0',function(){
		$compile(element)($rootScope);
		$rootScope.$digest();
		ctrl = element.isolateScope().photoGalleryCtrl;
		ctrl.openGallery(0)
		ctrl.switchImage(-1)

		$rootScope.$digest();
		expect(ctrl.index).toEqual(1);
	})

	describe('Keyboard interaction',function(){

		it('Should short circuit if gallery isnt open',function(){
			$compile(element)($rootScope);
			$rootScope.$digest();
			ctrl = element.isolateScope().photoGalleryCtrl;
			$rootScope.$digest();
			triggerKeyDown(39);
			$rootScope.$digest();
			expect(ctrl.index).toBeUndefined()

		})

		it('Should close the gallery when esc is pressed',function(){
			$compile(element)($rootScope);
			$rootScope.$digest();
			ctrl = element.isolateScope().photoGalleryCtrl;
			ctrl.openGallery(0)
			$rootScope.$digest();
			triggerKeyDown(27);
			$rootScope.$digest();
			expect(ctrl.open).toEqual(false)

		})

		it('Should go to next picture when right is pressed',function(){
			$compile(element)($rootScope);
			$rootScope.$digest();
			ctrl = element.isolateScope().photoGalleryCtrl;
			ctrl.openGallery(0)
			$rootScope.$digest();
			triggerKeyDown(39);
			$rootScope.$digest();
			expect(ctrl.index).toEqual(1)

		})

		it('Should go to prev picture when left is pressed',function(){
			$compile(element)($rootScope);
			$rootScope.$digest();
			ctrl = element.isolateScope().photoGalleryCtrl;
			ctrl.openGallery(1)
			$rootScope.$digest();
			triggerKeyDown(37);
			$rootScope.$digest();
			expect(ctrl.index).toEqual(0)

		})

		it('Should do nothing if not a bound keycode',function(){
			$compile(element)($rootScope);
			$rootScope.$digest();
			ctrl = element.isolateScope().photoGalleryCtrl;
			ctrl.openGallery(1)
			$rootScope.$digest();
			triggerKeyDown(38);
			$rootScope.$digest();
			expect(ctrl.index).toEqual(1)

		})
	})
});