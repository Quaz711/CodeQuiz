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
var repoList = document.querySelector('ul');

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
    var keyPress = event.key;
    if (keyPress == "Q") {
        startQuiz.style.display = "none";
        finalScoreDisplay.style.display = "none";
        enterInitials.style.display = "none";
        score = 50;
        clearInterval(timer);
        setQuestions();
        setButtons ();
        //finishedQuiz();
        //showScores();
        errorChecking();
    }
  });

cleanStyle();

timeRemaining.textContent = timeLeft;

viewHighscores.addEventListener("click", function() {
    var quizUsers = "";
    var substringTest = "";

    for (var i = 0; i < localStorage.length; i++) {
        var userOldScore = [];
        quizUsers = localStorage.getItem(localStorage.key(i));
        substringTest = quizUsers.substring(0, 4);
        if (substringTest == "quiz") {
            userOldScore = quizUsers.split(",");
            var userName = userOldScore[0];
            highScore += "User " + userName.substring(4) + " high score is: " + userOldScore[1] + "\n";
       }
    }
    window.alert(highScore);
});

clearHighscores.addEventListener("click", function() {
    localStorage.clear();
});

goBack.addEventListener("click", function() {
    window.location.reload();
});

submitScore.addEventListener("click", function() {
    var quizLocalStorage = "quiz";
    var quizUserDetails = "";
    quizUserDetails = quizLocalStorage + enterInitialsTextArea.value;
    var value = [quizUserDetails, score]

    if (!localStorage.length) {
        console.log("First IF Statement Entered");
        localStorage.setItem("test","test");
    }
        var counter = 0;
    for (var i = 0; i < localStorage.length; i++){
        console.log("Entered for loop: " + counter++);
        var checkUser = "";
        var userOldScore = [];
        quizUserDetails = quizLocalStorage + enterInitialsTextArea.value;
        checkUser = localStorage.getItem(quizUserDetails);
   
        if (checkUser == null) {//If user does not exist
            console.log("User does not exist");
            localStorage.setItem(quizUserDetails, value);
            window.alert("Your score of " + score + " has been submitted!");
            break;
        }
        
        else if (checkUser != null){//If user exists
            console.log("User exists");
            userOldScore = checkUser.split(",");
        } 

        if ( quizUserDetails == userOldScore[0] && score <= userOldScore[1] ) {
            console.log("Score is lower than previous score for same user");
            localStorage.setItem(quizUserDetails, value);
            window.alert("Your recent score of " + score + " is less than a previous entry for user initial " + enterInitialsTextArea.value + ". Entry will not be added.");
            break; 
        }
        
        else if (enterInitialsTextArea.value == "") {
            console.log("Empty entry");
            window.alert("Please enter initials");
            break;
        }
        
        else if (quizUserDetails == userOldScore[0] && score > userOldScore[1]) {
            console.log("Sixth IF Statement Entered");
            localStorage.setItem(quizUserDetails, value);
            window.alert("New high score of " + score + " has been submitted!.\nYour previous score was " + userOldScore[1]);
            break; 
        }
        
        else if (quizUserDetails == userOldScore[0] && score < userOldScore[1]) {
            console.log("Seventh IF Statement Entered");
            localStorage.setItem(quizUserDetails, value);
            window.alert("Your previous code of " + userOldScore[1] + " was higher. Entry will not be added.");
            break; 

        }
        
        else {
            console.log("Eigth IF Statement Entered");
            localStorage.setItem(quizUserDetails, value);
            window.alert("Your score of " + score + " has been submitted!")
            break;
        }
    }

    showScores();
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

function errorChecking (){
    function containsSpecialChars(str) {
        const specialChars = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        return specialChars.test(str);
    }

    function containsnumbers(str) {
        const numberCheck = /[0-9]/;
        return numberCheck.test(str);
    }
      var apple = "12dfgdfg";
      var pear = "sdfsdfg";
      var pineapple = "##@$dfgd";
      var peach = "#$%$%^";
      var kiwi = "456456";
     
      console.log("First Test");
      console.log(containsSpecialChars(apple));
      console.log(containsSpecialChars(pear));
      console.log(containsSpecialChars(pineapple));
      console.log(containsSpecialChars(peach));
      console.log(containsSpecialChars(kiwi));
      console.log("Second Test");
      console.log(containsnumbers(apple));
      console.log(containsnumbers(pear));
      console.log(containsnumbers(pineapple));
      console.log(containsnumbers(peach));
      console.log(containsnumbers(kiwi));
}

function showScores () {
    cleanStyle();
    document.getElementById("questionsDisplay").style.gridRow = 2;
    document.getElementById("questionsDisplay").style.placeSelf = "start";
    document.getElementById("questionsDisplay").style.fontSize = "xx-large";
    questionsDisplay.textContent = "High scores";
    goBack.style.display = "";
    clearHighscores.style.display = "";
    goBack.textContent = "Go back";
    clearHighscores.textContent = "Clear high scores";

    for (var i = 0; i < localStorage.length; i++) {
        var userOldScore = [];
        quizUsers = localStorage.getItem(localStorage.key(i));
        substringTest = quizUsers.substring(0, 4);
        if (substringTest == "quiz") {
            console.log("Entered If Statement");
            userOldScore = quizUsers.split(",");
            var userName = userOldScore[0];
            highScore += (i + 1) + ". " + userName.substring(4) + " - " + userOldScore[1];
            var listItem = document.createElement('li');
            listItem.textContent = highScore;
            repoList.appendChild(listItem);
        }
    }
}

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
    clearHighscores.style.display = "none";
    goBack.style.display = "none";
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