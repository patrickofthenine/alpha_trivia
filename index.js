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
		return response; 
	});
};

let main = new Vue({
	el: '#main',
	data: {
		questions: getQuestionBank()
	}
});

let questionMain = new Vue({
	el: '#question-main'
});

let questionHeader = new Vue({
	el: '#question-header'
});

let questionBody = new Vue({
	el: '#question-body'
});

let run = function(){
	getQuestionBank()
};

run();