
let questions = [];
let choice = document.getElementById("test-selection"); 
let startButton = document.getElementById("start-btn");
//let selectButton = document.getElementById("select-btn");

startButton.addEventListener("click", function() {
  if(choice.value === "MultipleChoice") {
      try {
          window.location.href = "ChooseCategory.html";
      } catch (error) {
          console.error('Error:', error);
      }
  }
  if(choice.value === "TrueFalse") {
    try {
        window.location.href = "ChooseCategory2.html";
    } catch (error) {
        console.error('Error:', error);
    }
}
});

choice.addEventListener("change", function() {
  let selectedValue = this.value; 
  startButton.disabled = true; 
  fetch(selectedValue + '.json')
    .then(response => response.json())
    .then(data => {
      questions = data;
      startButton.disabled = false; 
    })
    .catch((error) => {
      console.error('Error:', error);
      startButton.disabled = false; 
    });
});

const quizContainer = document.querySelector(".quiztf");
const questionElement = document.querySelector(".quiztf h2");
const answerButtons = document.querySelector(".quiztf #tf-answer-buttons");
const nextButton = document.getElementById("next-btn");
//const timeText = document.querySelector("Time_left_txt");
//const timeCount = document.querySelector("timer_sec");
//var timer = document.querySelector("timer");

startButton.addEventListener("click", startGame);

let currentQuestionIndex = 0;
let score = 0;

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

function startGame() {
shuffleArray(questions);
questions = questions.slice(0, 10); 
currentQuestionIndex = 0;
score = 0;
nextButton.innerHTML = "Next";
startButton.style.display = "none";
choice.style.display = "none"; 
//quizContainer.style.display = "block";
setNextQuestion();
}

function setNextQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  questionElement.innerHTML = `Question ${currentQuestionIndex + 1}: ${currentQuestion.question}`;

  currentQuestion.answers.forEach(answer => {
      const button = document.createElement("button");
      button.innerHTML = answer.text;
      button.classList.add("btn");
      answerButtons.appendChild(button);
      if(answer.correct){
        button.dataset.correct = answer.correct;
      }
      button.addEventListener("click", selectAnswer);
  });
}


function resetState(){
nextButton.style.display = "none";
while(answerButtons.firstChild){
  answerButtons.removeChild(answerButtons.firstChild);
}
}
function selectAnswer(e){
const selectedBtn = e.target
const isCorrect = selectedBtn.dataset.correct === "true";
if(isCorrect){
  selectedBtn.classList.add("correct");
  score++;
}else{
  selectedBtn.classList.add("incorrect");
}
Array.from(answerButtons.children).forEach(button => {
  if(button.dataset.correct === "true"){
    button.classList.add("correct");
  }
  button.disabled = true;
});
nextButton.style.display = "block";
}
function showScore(){
resetState();
questionElement.innerHTML = `Your scored ${score} out of ${questions.length}!`;
nextButton.innerHTML = "Play Again";
nextButton.style.display = "block";
startButton.style.display = "none";
}

function handleNextButton(){
currentQuestionIndex++;
if(currentQuestionIndex<questions.length){
  setNextQuestion(); 
}else{
  showScore();
}
}

nextButton.addEventListener("click", ()=>{
  if(currentQuestionIndex < questions.length){
    handleNextButton();
  }else{
    window.location.reload(); 
  }
})
