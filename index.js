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
			console.log(self.questions);
			formatQuestionBank(self.questions);
			return self.questions;
		},
		error: function(error){
			console.log(error);
		}
	});
};

function shuffle(array){
	var currentIndex = array.length, temporaryValue, randomIndex;

	  // While there remain elements to shuffle...
	  while (0 !== currentIndex) {

	    // Pick a remaining element...
	    randomIndex = Math.floor(Math.random() * currentIndex);
	    currentIndex -= 1;

	    // And swap it with the current element.
	    temporaryValue = array[currentIndex];
	    array[currentIndex] = array[randomIndex];
	    array[randomIndex] = temporaryValue;
	}
	return array;
}

function shuffleAnswerBank(question){
	this.question = question;
	//shuffle answers using fisher yates shuffle SO https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array/31054543
	this.shuffledAnswers = shuffle(this.question.incorrect_answers);
	//get a random index for our correct answer yet to be added
	this.correctIndex = Math.floor(Math.random() * this.shuffledAnswers.length+1);
	//add correct answer to shuffled answer bank
	this.shuffledAnswers.splice(this.correctIndex, 0, this.question.correct_answer)
	this.answers = {
		correct: this.correctIndex,
		answers: this.shuffledAnswers
	};
	return this.answers;
}

function formatQuestionBank(questionBank){
	this.questionBank = questionBank;
	if(!questionBank) 
		return;
	
	this.formatted = [];
	for(let i = 0; i < this.questionBank.length; i++){
		this.question = this.questionBank[i];
		this.question['formatted_answers'] = shuffleAnswerBank(this.question);
		console.log('TQ', this.question);
	}	
}

let questionMain = Vue.component('question-main', {
	props: ['question'],
	template: 
	`
		<div>
			<question-header v-bind:question="question.question"></question-header>
			<question-body v-bind:answers="question.formatted_answers"></question-body>
		</div>
	`
});

let questionHeader = Vue.component('question-header', {
	props: ['question'],
	template: 
	` 
		<div> 
			<span class="question-header"><h2>{{question}}</h2></span>
		</div>
	`
})

let questionAnswers = Vue.component('question-body', {
	props: ['answers'],
	template: 
	`
		<div>
			<ol>
				<li v-for="answer in answers.answers">{{answer}}</li>
			</ol>
		</div>'
	`
})

new Vue({
	el: '#trivia',
	data: function(){
		return { 
			questions: [] 
		}
	},
	beforeCreate: getQuestionBank
});