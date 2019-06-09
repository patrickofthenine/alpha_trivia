let config = {
	reqBase: 'https://opentdb.com/api.php',
	params: {
		amount: 10
	}
}

let getQuestionBank = function(){
	return $.ajax({
		url: config.reqBase,
		type: 'GET',
		data: config.params
	}).done( (response)=>{
		return response.results; 
	});
};

new Vue({
	el: '#trivia',
	data: function(){
		return {
			questions: getQuestionBank()
		}
	}
});

Vue.component('question-main', {
	props: ['question'],
	template: '<div> Question: {{question}} </div>',
})

