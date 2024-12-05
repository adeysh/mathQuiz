const questionEl = document.getElementById("question");
const answerInputEl = document.getElementById('answerInput');
const scoreEl = document.getElementById("score");
const submitBtn = document.getElementById('submitBtn');

// get the score from localStorage
document.addEventListener("DOMContentLoaded", (event) => {
    if (localStorage.getItem("score") !== null) {
        let score = localStorage.getItem("score");
        scoreEl.innerText = `Score -> ${score}`;
    } else {
        scoreEl.innerText = `Score -> 0`;
    }
});

// get random integer
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// get random operator
function getRndOperator() {
    const operators = {
        1: "addition",
        2: "subtraction",
        3: "multiplication",
        4: "division",
    };

    const randomInt = getRndInteger(1, 4);
    const operator = operators[randomInt];

    return operator;
}

// generate random question
function generateQuestion() {
    const randomInt1 = getRndInteger(1, 10);
    const randomInt2 = getRndInteger(1, 10);
    const randomOperator = getRndOperator();

    let question = "";
    let answer = 0;
    switch (randomOperator) {
        case "addition":
            question = `What is ${randomInt1} added to ${randomInt2} ?`;
            answer = randomInt1 + randomInt2;
            break;
        case "subtraction":
            question = `What is ${randomInt1} subtracted from ${randomInt2} ?`;
            answer = randomInt2 - randomInt1;
            break;
        case "multiplication":
            question = `What is ${randomInt1} multiply by ${randomInt2} ?`;
            answer = randomInt1 * randomInt2;
            break;
        case "division":
            question = `What is ${randomInt1} divided by ${randomInt2} ?`;
            answer = (randomInt1 / randomInt2).toFixed(1);
            break;
        default:
            break;
    }

    return {
        question: question,
        answer: answer
    };
}

// display question
function displayQuestion(questionAnsObj) {
    questionEl.innerText = questionAnsObj.question;
}

// getting user input and checking calculation
function getUserInputAndCheck(questionAnsObj) {
    let isCorrect = false;
    if (Number(questionAnsObj.answer) === Number(answerInputEl.value)) {
        isCorrect = true;
        return isCorrect;
    } else {
        return isCorrect;
    }
}

// updating the score
let score = 0;
function changeScore(isCorrectValue) {
    score += isCorrectValue ? 1 : -1;
    localStorage.setItem("score", score);

    // giving feedback with toastify library
    if (isCorrectValue) {
        Toastify({
            text: `You are correct and your score is ${score}`,
            duration: 2000,
            gravity: "bottom", // Position: "top" or "bottom"
            position: "center", // Align: "left", "center", or "right"
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
        }).showToast();
    } else {
        Toastify({
            text: `Incorrect! Your score is now ${score}`,
            duration: 2000,
            gravity: "bottom",
            position: "center",
            style: {
                background: "linear-gradient(to right, #f23a3a, #e3cc00)",
            },
        }).showToast();
    }

    questionAnsObj = generateQuestion();
    displayQuestion(questionAnsObj);
    scoreEl.innerText = `Score -> ${score}`;
}

let questionAnsObj = generateQuestion();
getRndOperator();
displayQuestion(questionAnsObj);


submitBtn.addEventListener("click", (event) => {
    // checking valid user input 
    let isValid = true;
    const value = answerInputEl.value ? Number(answerInputEl.value) : "";
    if (value < -100 || value > 100 || isNaN(value) || value == "") {
        isValid = false;
        answerInputEl.setCustomValidity("Enter a number between -100 and 100.");
        answerInputEl.reportValidity();
    } else {
        answerInputEl.setCustomValidity("");
    }

    if (isValid) {
        event.preventDefault();
        const isCorrectValue = getUserInputAndCheck(questionAnsObj);
        changeScore(isCorrectValue);
        answerInputEl.value = "";
    }
});
