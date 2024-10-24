const question1 = ["Which method is used to add one or more elements to the end of an array?", "Array.push()", "Array.add()", "Array.insert()", "Array.append()"];
const question2 = ["What will the output of console.log(['a', 'b', 'c'].length) be?", "3", "2", "undefined", "NaN"];
const question3 = ["Which method would you use to remove the first element from an array?", "Array.shift()", "Array.pop()", "Array.removeFirst()", "Array.slice(1)"];
const question4 = ["What does the String.prototype.trim() method do?", "Removes whitespace from both ends of a string", "Converts a string to lowercase", "Replaces all occurrences of a substring", "Splits a string into an array"];
const question5 = ["Which of the following will correctly convert a string to an array of characters?", "str.split('')", "str.toArray()", "Array.from(str)", "str.array()"];
const question6 = ["What will the output of console.log('hello'.charAt(1)) be?", "'e'", "'h'", "'l'", "undefined"];
const question7 = ["How can you define a function that takes an arbitrary number of arguments in JavaScript?", "function myFunc(...args) {}", "function myFunc(args) {}", "function myFunc(args...) {}", "function myFunc(arg1, arg2) {}"];
const question8 = ["What will the output of console.log([1, 2, 3].map(x => x * 2)) be?", "[2, 4, 6]", "[1, 2, 3]", "[2, 3, 4]", "undefined"];
const question9 = ["Which method can be used to find the index of a specific element in an array?", "Array.indexOf()", "Array.findIndex()", "Array.search()", "Array.locate()"];
const question10 = ["What will console.log('foo' + 'bar') output?", "'foobar'", "'foo bar'", "undefined", "NaN"];
const question11 = ["How do you create a function expression in JavaScript?", "const myFunc = function() {}", "function myFunc() {}", "myFunc() = function {}", "var myFunc() {}"];
const question12 = ["What will the output of console.log('hello'.slice(1, 4)) be?", "'ell'", "'hel'", "'llo'", "'o'"];
const question13 = ["Which method is used to reverse the elements of an array in place?", "Array.reverse()", "Array.flip()", "Array.invert()", "Array.changeOrder()"];
const question14 = ["What will console.log([1, 2, 3].includes(2)) output?", "true", "false", "undefined", "TypeError"];
const question15 = ["How can you create a new array with all elements that pass a test implemented by a provided function?", "Array.filter()", "Array.map()", "Array.forEach()", "Array.reduce()"];
const question16 = ["What does the String.prototype.split() method return?", "An array of substrings", "A string", "A number", "An object"];
const question17 = ["What will console.log(['a', 'b', 'c'].join('-')) output?", "'a-b-c'", "'abc'", "['a', 'b', 'c']", "undefined"];
const question18 = ["Which method can be used to concatenate two arrays?", "Array.concat()", "Array.merge()", "Array.append()", "Array.combine()"];
const question19 = ["What will console.log(typeof function() {}) output?", "'function'", "'object'", "'undefined'", "'string'"];
const question20 = ["Which method would you use to sort an array of numbers in ascending order?", "Array.sort()", "Array.order()", "Array.arrange()", "Array.sequence()"];

const questions = [
    question1,
    question2,
    question3,
    question4,
    question5,
    question6,
    question7,
    question8,
    question9,
    question10,
    question11,
    question12,
    question13,
    question14,
    question15,
    question16,
    question17,
    question18,
    question19,
    question20
];

const answers = [
    "Array.push()",
    "3",
    "Array.shift()",
    "Removes whitespace from both ends of a string",
    "str.split('')",
    "'e'",
    "function myFunc(...args) {}",
    "[2, 4, 6]",
    "Array.indexOf()",
    "'foobar'",
    "const myFunc = function() {}",
    "'ell'",
    "Array.reverse()",
    "true",
    "Array.filter()",
    "An array of substrings",
    "'a-b-c'",
    "Array.concat()",
    "'function'",
    "Array.sort()"
];

let remainingQuestions = [...questions]; 
let currentQuestions = [];
const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const quizContainerDiv = document.getElementById('quiz-container');
const startButton = document.getElementById('start');
const timeDisplay = document.getElementById('time');
const checkButton = document.getElementById('check');
const nextButton = document.getElementById('next');
let timer;
let startTime;
let correctAnswersCount = 0;

checkButton.disabled = true;
nextButton.disabled = true;

function startTimer() {
    startTime = Date.now();
    timer = setInterval(() => {
        const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        timeDisplay.textContent = formatTime(elapsedTime);
    }, 1000);
}

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function generateQuiz() {
    quizContainer.innerHTML = ''; 
    currentQuestions = [];
    while (currentQuestions.length < 2 && remainingQuestions.length > 0) {
        const randomIndex = Math.floor(Math.random() * remainingQuestions.length);
        currentQuestions.push(remainingQuestions[randomIndex]);
        remainingQuestions.splice(randomIndex, 1); 
    }

    currentQuestions.forEach((question, index) => {
        const questionHTML = `
            <div class="question">
                <p>${question[0]} <span class="icon"></span></p>
                <label><input type="radio" name="q${index}" value="${question[1]}"> ${question[1]}</label><br>
                <label><input type="radio" name="q${index}" value="${question[2]}"> ${question[2]}</label><br>
                <label><input type="radio" name="q${index}" value="${question[3]}"> ${question[3]}</label><br>
                <label><input type="radio" name="q${index}" value="${question[4]}"> ${question[4]}</label>
            </div>
        `;
        quizContainer.innerHTML += questionHTML;
    });
    
    checkButton.disabled = false; 
    nextButton.disabled = true; 
    updateRemainingQuestions(); 
}


function checkAnswers() {
    currentQuestions.forEach((question, index) => {
        const selectedAnswer = document.querySelector(`input[name="q${index}"]:checked`);
        const questionContainer = document.querySelector(`.question:nth-child(${index + 1})`);
        const iconSpan = questionContainer.querySelector('.icon');

        if (selectedAnswer && selectedAnswer.value === answers[questions.indexOf(question)]) {
            correctAnswersCount++;

            iconSpan.innerHTML = '✅'; 
            iconSpan.className = 'correct';
            remainingQuestions = remainingQuestions.filter(q => q !== question); 
        } else {

            iconSpan.innerHTML = '❌'; 
            iconSpan.className = 'incorrect';
            if (!remainingQuestions.includes(question)) {
                remainingQuestions.push(question);
            }
        }
    });

    updateRemainingQuestions(); 

    if (remainingQuestions.length === 0) {
        showCongratulations();
    } else {
        nextButton.disabled = false; 
    }
    checkButton.disabled = true; 
}

function updateRemainingQuestions() {
    const totalQuestions = questions.length;
    document.getElementById('remaining-questions').textContent = `${correctAnswersCount} out of ${totalQuestions} questions answered correctly`;
}

function showCongratulations() {
    clearInterval(timer);
    const totalTime = Math.floor((Date.now() - startTime) / 1000);
    resultContainer.innerHTML = `<h2>Congratulations!</h2>`;
    resultContainer.innerHTML += `<h3>Time taken: ${formatTime(totalTime)}</h3>`;
}

startButton.addEventListener('click', () => {
    quizContainerDiv.style.display = 'block';
    startButton.style.display = 'none';
    generateQuiz();
    startTimer();
});

checkButton.addEventListener('click', checkAnswers);
nextButton.addEventListener('click', generateQuiz);
