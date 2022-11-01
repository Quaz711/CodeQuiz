var quizStatus = true;
var quizEnded = false;
var timer;
var timeLeft = 0;
var questionNumber = 0;
var answerNumber = 0;
var score = 0;
var highScore;
var theAnswer1 = "alerts";
var theAnswer2 = "parenthesis";
var theAnswer3 = "all of the above";
var theAnswer4 = "curly brackets";
var theAnswer5 = "for loops";

var questionsObject = {
    questions: { 
        0 : "Commonly used data types DO Not Include:",
        1 : "The condition in an if / else statement is enclosed with __________.",
        2 : "Arrays in JavaScript can be used to store __________.",
        3 : "String values must be enclosed within __________ when being assigned to variables.",
        4 : "A very useful tool used during development and debugging for printing content to the debugger is:"
    }
};

var answersObject = {
    answers: { 
        0 : {
            0: "strings",
            1: "booleans",
            2: "alerts",
            3: "numbers"},
        1 : {
            0: "quotes",
            1: "curly brackets",
            2: "parenthesis",
            3: "square brackets"},
        2 : {
            0: "numbers and strings",
            1: "other arrays",
            2: "booleans", 
            3: "all of the above"},      
        3 : {
            0: "commas",
            1: "curly brackets",
            2: "quotes", 
            3: "parenthesis"},      
        4 : {
            0: "JavaScript",
            1: "terminal/bash",
            2: "for loops",
            3: "console.log"},  
    }
};

document.addEventListener("keydown", function(event) {
    startQuiz.style.display = "none";
    finalScoreDisplay.style.display = "none";
    enterInitials.style.display = "none";
    score = 50;
    setQuestions();
    setButtons ();
    finishedQuiz();
  });

cleanStyle();

timeRemaining.textContent = timeLeft;

viewHighscores.addEventListener("click", function() {
    var quizUsers = "";
    var substringTest = "";
    var highScores = "";

    for (var i = 0; i < localStorage.length; i++) {
        var checkUserValue = [];
        quizUsers = localStorage.getItem(localStorage.key(i));
        substringTest = quizUsers.substring(0, 4);
        if (substringTest == "quiz") {
            checkUserValue = quizUsers.split(",");
            var userName = checkUserValue[0];
            highScores += "User " + userName.substring(4) + " high score is: " + checkUserValue[1] + "\n";
       }
    }
    window.alert(highScores);
});

submitScore.addEventListener("click", function() {
    var quizLocalStorage = "quiz";
    var quizUserDetails = "";
    quizUserDetails = quizLocalStorage + enterInitialsTextArea.value;
    var value = [quizUserDetails, score]

    if (!localStorage.length) {
        localStorage.setItem("test","test");
    }
        
    for (var i = 0; i < localStorage.length; i++){
        var checkUser = "";
        var checkUserValue = [];
        quizUserDetails = quizLocalStorage + enterInitialsTextArea.value;
        checkUser = localStorage.getItem(quizUserDetails);
   
        if (checkUser == null) {
            localStorage.setItem(quizUserDetails, value);
            window.alert("Your score of " + score + " has been submitted!");
            break;
        }
        
        else if (checkUser != null){
            checkUserValue = checkUser.split(",");
        } 

        if ( quizUserDetails == checkUserValue[0] && score == checkUserValue[1] ) {
        localStorage.setItem(quizUserDetails, value);
        window.alert(score + " " + "is the latest entry for user initial " + enterInitialsTextArea.value + ". Entry will not be added.");
        break; 
        }
        
        else if (enterInitialsTextArea.value == "") {
            window.alert("Please enter an initial");
            break;
        }
        
        else if (quizUserDetails == checkUserValue[0] && score > checkUserValue[1]) {
            localStorage.setItem(quizUserDetails, value);
            window.alert("New high score of " + score + " has been submitted!.\nYour previous score was " + checkUserValue[1]);
            break; 
        }
        
        else if (quizUserDetails == checkUserValue[0] && score < checkUserValue[1]) {
            localStorage.setItem(quizUserDetails, value);
            window.alert("Your previous code of " + checkUserValue[1] + " was higher. Entry will not be added.");
            break; 

        }
        
        else {
            localStorage.setItem(quizUserDetails, value);
            window.alert("Your score of " + score + " has been submitted!")
            break;
        }
    } 
});

submitScore.addEventListener("mouseover", function() {
    correctORwrong.style.display = "none";
});

answer1.addEventListener("mouseover", function() {
    correctORwrong.style.display = "none";
});

answer2.addEventListener("mouseover", function() {
    correctORwrong.style.display = "none";
});

answer3.addEventListener("mouseover", function() {
    correctORwrong.style.display = "none";
});

answer4.addEventListener("mouseover", function() {
    correctORwrong.style.display = "none";
});

function answeredCorrect () {
    correctORwrong.style.display = "";
    correctORwrong.textContent = "Correct!";
    correctORwrong.style.borderTop = "solid #800080";
    score += 10;
    questionNumber++;
    answerNumber++;
    if (questionNumber == 5) {
        quizEnded = true;
    }
}

function answeredWrong () {
    correctORwrong.style.display = "";
    correctORwrong.textContent = "Wrong!";
    correctORwrong.style.borderTop = "solid #800080";
    timeLeft -= 10;
    questionNumber++;
    answerNumber++;
    if (questionNumber == 5) {
        quizEnded = true;
    }
}

function setButtons () {
    if (!quizEnded) {
        answer1.style.display = "";
        answer2.style.display = "";
        answer3.style.display = "";
        answer4.style.display = "";
        answer1.textContent = answersObject.answers[answerNumber][0];
        answer2.textContent = answersObject.answers[answerNumber][1];
        answer3.textContent = answersObject.answers[answerNumber][2];
        answer4.textContent = answersObject.answers[answerNumber][3];
    }
}

function setQuestions () {
    if (!quizEnded) {
        labelDisplay1.style.display = "none";
        labelDisplay2.style.display = "none";
        questionsDisplay.style.display = "none"
        questionsDisplay.textContent = questionsObject.questions[questionNumber];
        questionsDisplay.style.display = "";
    }
}

function cleanStyle() {
    answer1.style.display = "none";
    answer2.style.display = "none";
    answer3.style.display = "none";
    answer4.style.display = "none";
    submitScore.style.display = "none";
    correctORwrong.style.display = "none";
    enterInitialsTextArea.style.display = "none";
}

startQuiz.addEventListener("click", startTheQuiz);

function startTheQuiz() {
    timeLeft = 60;
    startQuiz.style.display = "none";
    finalScoreDisplay.style.display = "none";
    enterInitials.style.display = "none";
    setQuestions();
    setButtons ();
    score = 0;
    timeLeft = 60;
    timeRemaining.textContent = timeLeft;
    finalAnswerCheck = 0;
    checkTimes = 1;   
    startTimer();
  }
  
function startTimer() {
    timer = setInterval(function() {
        timeLeft--;
        timeRemaining.textContent = timeLeft;
        if (timeLeft >= 0) {
            if (quizEnded) {
                clearInterval(timer);
                finishedQuiz();
            }
        }

        if (timeLeft === 0) {
            clearInterval(timer);
            finishedQuiz();
        }
    }, 1000);
}


function finishedQuiz () {
    console.log("Quiz is finished!");
    cleanStyle();
    document.getElementById("questionsDisplay").style.gridRow = 4;
    document.getElementById("questionsDisplay").style.placeSelf = "start";
    document.getElementById("questionsDisplay").style.fontSize = "xx-large";
    questionsDisplay.textContent = "All done!";
    finalScoreDisplay.style.display = "";
    enterInitials.style.display = "";
    enterInitialsTextArea.style.display = "";
    finalScoreDisplay.textContent = "Your final score is " + score;
    enterInitials.textContent = "Enter initials: ";
    submitScore.style.display = "";
    submitScore.textContent = "Submit";
    //clearInterval(timeInterval);
}

answer1.addEventListener("click", function() {
    if (!quizEnded) {
        var userAnswer = answer1.textContent;
        if (questionNumber == 0 && theAnswer1 == userAnswer) {
            answeredCorrect();
        }

        else if (questionNumber == 1 && theAnswer2 == userAnswer) {
            answeredCorrect();
        }

        else if (questionNumber == 2 && theAnswer3 == userAnswer) {
            answeredCorrect();
        }

        else if (questionNumber == 3 && theAnswer4 == userAnswer) {
            answeredCorrect();
        }

        else if (questionNumber == 4 && theAnswer5 == userAnswer) {
            answeredCorrect();
        }

        else {
            answeredWrong();
        }

        setButtons ();
        setQuestions ();
    }
});

answer2.addEventListener("click", function() {
    if (!quizEnded) {
        var userAnswer = answer2.textContent;
        if (questionNumber == 0 && theAnswer1 == userAnswer) {
            answeredCorrect();
        }

        else if (questionNumber == 1 && theAnswer2 == userAnswer) {
            answeredCorrect();
        }

        else if (questionNumber == 2 && theAnswer3 == userAnswer) {
            answeredCorrect();
        }

        else if (questionNumber == 3 && theAnswer4 == userAnswer) {
            answeredCorrect();
        }

        else if (questionNumber == 4 && theAnswer5 == userAnswer) {
            answeredCorrect();
        }

        else {
            answeredWrong();
        }

        setButtons ();
        setQuestions ();
    }
});

answer3.addEventListener("click", function() {
    if (!quizEnded) {
        var userAnswer = answer3.textContent;
        if (questionNumber == 0 && theAnswer1 == userAnswer) {
            answeredCorrect();
        }

        else if (questionNumber == 1 && theAnswer2 == userAnswer) {
            answeredCorrect();
        }

        else if (questionNumber == 2 && theAnswer3 == userAnswer) {
            answeredCorrect();
        }

        else if (questionNumber == 3 && theAnswer4 == userAnswer) {
            answeredCorrect();
        }

        else if (questionNumber == 4 && theAnswer5 == userAnswer) {
            answeredCorrect();
        }

        else {
            answeredWrong();
        }
        
        setButtons ();
        setQuestions ();
    }
});

answer4.addEventListener("click", function() {
    if (!quizEnded) {
        var userAnswer = answer4.textContent;
        if (questionNumber == 0 && theAnswer1 == userAnswer) {
            answeredCorrect();
        }

        else if (questionNumber == 1 && theAnswer2 == userAnswer) {
            answeredCorrect();
        }

        else if (questionNumber == 2 && theAnswer3 == userAnswer) {
            answeredCorrect();
        }

        else if (questionNumber == 3 && theAnswer4 == userAnswer) {
            answeredCorrect();
        }

        else if (questionNumber == 4 && theAnswer5 == userAnswer) {
            answeredCorrect();
        }

        else {
            answeredWrong();
        }

        setButtons ();
        setQuestions ();
    }
});