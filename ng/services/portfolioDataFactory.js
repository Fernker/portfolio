(function(){
	angular.module('portfolioApp')
		.factory('portfolioData',['$http', '$q',portfolioDataFunc])


	function portfolioDataFunc($http, $q){
		var portfolio;

		function getPortfolio(){
			if(portfolio){
				console.log('optimize');
				return $q.when(portfolio);
			}else{

				return $http.get('data/port.json',{cache:true})
					.then(function(data){
						portfolio = data.data;



						portfolio.everything = [];
						portfolio.everything = portfolio.everything.concat(portfolio.a);
						portfolio.everything = portfolio.everything.concat(portfolio.b);

						portfolio.skills = getSkills(portfolio);
						console.log('interesting');
						return portfolio;

					})
			}
		}

		function getExperience(experienceUrl){
			return getPortfolio()
				.then(function(portfolio){
					return _.findWhere(portfolio.a,{'url':experienceUrl})
				})
		}

		function getProject(projectUrl){
			return getPortfolio()
				.then(function(portfolio){
					return _.findWhere(portfolio.b,{'url':projectUrl})
				})
		}

		function getSkill(skillName){
			skillName = skillName.replace(/-/g,' ');
			return getPortfolio()
				.then(function(portfolio){
					return _.filter(portfolio.everything, function(obj) {
						if(obj.skills.indexOf(skillName) > -1){
							return true;
						}
						return false;
					})
				})
		}



		return {
			getPortfolio: getPortfolio,
			getExperience: getExperience,
			getProject: getProject,
			getSkill: getSkill
		};


		//Private//

		function getSkills(portfolio){
			var skillsUnsorted = _.pluck(portfolio.everything,'skills');
			//skillsUnsorted = skillsUnsorted.concat(_.pluck(portfolio.a,'skills'));
			//skillsUnsorted = skillsUnsorted.concat(_.pluck(portfolio.b,'skills'));
			return frequency(_.flatten(skillsUnsorted,true));
		}


		function frequency(arr){
			var result = [];

			for(var i = 0; i < arr.length; i++){
				var match = _.findWhere(result,{'skill':arr[i]})
				if(match){
					match.count += 1;
				}else{
					result.push({
						'skill':arr[i],
						'count': 1
					})
				}
			}
			return result;
		}
	}
})();