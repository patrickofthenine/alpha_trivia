let config = {
	reqBase: 'https://opentdb.com/api.php',
	params: {
		amount: 10
	}
}

function getQuestionBank(){
	let self = this;
	return $.ajax({
		url: config.reqBase,
		type: 'GET',
		data: config.params,
		success: function(results){
			self.questions = results.results;
			return self.questions;
		},
		error: function(error){
			console.log(error);
		}
	});
};

new Vue({
	el: '#trivia',
	data: function(){
		return { 
			questions: [] 
		}
	},
	beforeCreate: getQuestionBank
});

Vue.component('question-main', {
	props: ['question'],
	template: '<div> Q {{question.question}} </div>',
})
