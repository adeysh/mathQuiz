const questionEl = document.getElementById("question");
const answerInputEl = document.getElementById('answerInput');
const scoreEl = document.getElementById("score");
const submitBtn = document.getElementById('submitBtn');


function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateQuestion() {
    const randomInt1 = getRndInteger(1, 10);
    const randomInt2 = getRndInteger(1, 10);

    const question = `What is ${randomInt1} multiply by ${randomInt2} ?`;
    const answer = randomInt1 * randomInt2;

    return {
        question: question,
        answer: answer
    };
}


function displayQuestion(questionAnsObj) {
    questionEl.innerText = questionAnsObj.question;
}


function getUserInputAndCheck(questionAnsObj) {
    let isCorrect = false;
    if (questionAnsObj.answer === Number(answerInputEl.value)) {
        isCorrect = true;
        return isCorrect;
    } else {
        return isCorrect;
    }
}

let score = 0;
function changeScore(isCorrectValue) {
    score += isCorrectValue ? 1 : -1;

    questionAnsObj = generateQuestion();
    displayQuestion(questionAnsObj);
    answerInputEl.innerText = "";
    scoreEl.innerText = `Score -> ${score}`;
}

let questionAnsObj = generateQuestion();
displayQuestion(questionAnsObj);


submitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const isCorrectValue = getUserInputAndCheck(questionAnsObj);
    changeScore(isCorrectValue);
});
