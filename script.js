let questionNum = 0;
let score = 0;

//generate question
function generateQuestion() {
  if (questionNum < STORE.length) {
    return `<div class="question-${questionNum}">
    <h1>${STORE[questionNum].question}</h1>
    <form>
      <fieldset>
        <label class="answerOption">
        <input type="radio" value="${STORE[questionNum].answers[0]}" name="answer" required checked/>
        <span>${STORE[questionNum].answers[0]}</span>
        </label>
        <label class="answerOption">
        <input type="radio" value="${STORE[questionNum].answers[1]}" name="answer" required>
        <span>${STORE[questionNum].answers[1]}</span>
        </label>
        <label class="answerOption">
        <input type="radio" value="${STORE[questionNum].answers[2]}" name="answer" required>
        <span>${STORE[questionNum].answers[2]}</span>
        </label>
        <label class="answerOption">
        <input type="radio" value="${STORE[questionNum].answers[3]}" name="answer" required>
        <span>${STORE[questionNum].answers[3]}</span>
        </label>
        <button type="submit" class="submitButton">Down the Hatch!</button>
      </fieldset>
    </form>
  </div>`;
  }
  else {
    renderResults();
    restartQuiz();
    $('.questionNum').text(10)
  }
}

//change question number
function changeQuestionNum() {
  questionNum ++;
  $('.questionNum').text(questionNum+1);
}

//change score
function changeScore() {
  score ++;
}

//start quiz
function startQuiz() {
  $('.quizStart').on('click', '.startButton', function (event){
    $('.quizStart').remove();
    $('.quizForm').css('display', 'block');
    $('.questionNum').text(1);
  });
}

//display question
function renderQuestion() {
  $('.quizForm').html(generateQuestion());
}

//select, submit, and validate answer
function userSelectAnswer() {
  $('form').on('submit', function (event) {
    event.preventDefault();
    let selected = $('input:checked');
    let answer = selected.val();
    let correctAnswer =`${STORE[questionNum].correctAnswer}`;
    if (answer === correctAnswer) {
      selected.parent().addClass('correct');
      ifAnswerIsCorrect();
    }
    else {
      selected.parent().addClass('wrong');
      ifAnswerIsWrong();
    }
  });
}

//update score if answer is correct
function ifAnswerIsCorrect() {
  userAnswerFeedbackCorrect();
  updateScore();
}

function ifAnswerIsWrong() {
  userAnswerFeedbackWrong();
}

//feedback for correct answer
function userAnswerFeedbackCorrect() {
  let correctAnswer = `${STORE[questionNum].correctAnswer}`;
  $('.quizForm').html(`<div class="correctFeedback"><h1>Cheers, you got it right!</h1><br><img src="https://cdn.pixabay.com/photo/2018/04/21/19/28/glass-3339271_1280.jpg" alt="beer mug held up to cheers"><br><button type="button" class="nextButton">Pour Me Another</button></div>`);
}

//feedback for wrong answer
function userAnswerFeedbackWrong() {
  let correctAnswer = `${STORE[questionNum].correctAnswer}`;
  $('.quizForm').html(`<div class="correctFeedback"><h1>Take another sip to help ease the pain of being wrong.</h1><br><img src="https://cdn.pixabay.com/photo/2018/04/22/01/53/drink-3340010_1280.jpg" alt="woman drinking beer from mug"><br><p>The correct answer is <span>"${correctAnswer}"</span></p><button type="button" class="nextButton">Pour Me Another</button></div>`);
}

//update score
function updateScore() {
  changeScore();
  $('.score').text(score);
}

//advancing the quiz
function renderNextQuestion() {
  $('main').on('click', '.nextButton', function (event) {
    changeQuestionNum();
    renderQuestion();
    userSelectAnswer();
  });
}

//results page
function renderResults(){
  $('.quizForm').html(`<h2>Final Score: ${score}/10</h2><p class="finalPageText">Regardless of your final score, always remember to eat while you drink!</p><br><img src="https://cdn.pixabay.com/photo/2015/09/29/12/33/oktoberfest-963852_1280.jpg" alt="bavarian pretzel" class="final"><button type="button" class="restartButton">Try Again?</button></div>`);
}

//restart quiz
function restartQuiz() {
  $('main').on('click', '.restartButton', function (event) {
    location.reload();
  });
}

//run quiz 
function createQuiz() {
  startQuiz();
  renderQuestion();
  userSelectAnswer();
  renderNextQuestion();
}

$(createQuiz);
