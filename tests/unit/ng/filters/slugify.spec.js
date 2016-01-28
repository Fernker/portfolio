describe('Slugify filter',function(){
	var $filter,slugify;

	beforeEach(function(){
		module('portfolioApp');
	})

	beforeEach(inject(function(_$filter_){
		$filter = _$filter_;
		slugify = $filter('slugify');
	}))


	it('Should add dashes in place of spaces',function(){
		expect(slugify('This is a Test')).toEqual('This-is-a-Test');
	})
})