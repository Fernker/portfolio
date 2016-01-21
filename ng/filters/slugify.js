(function(){
	angular.module('portfolioApp')
		.filter("slugify", [function() {
        return function(input) {
            
        	return input.replace(/ /g, '-');
            //return .slugify(input);
        };
    }]);
})();