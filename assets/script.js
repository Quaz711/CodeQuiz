var createList = document.querySelector('ul'); //variable that holds the unorder list
var quizEnded = false; //variable that checks to see if the quiz has ended
var errorDetected = false; //variable that checks to see if an error was detected
var quizUser; //variable that hold the user taking the quiz
var userScore; //variable that holds the users score
var timeLeft = 0; //variable that holds the time left
var questionNumber = 0; //variable that holds what number question the user is on
var answerNumber = 0; //variable that holds what answers appear on the buttons for the current question
var score = 0; //variable that holds the current score for the current quiz
var timer; //variable that holds the set interval function
var highScoresDisplay = ""; //variable that displays the highscores in the html tags
var theAnswer1 = "alerts"; //variable that holds the correct answer to question one
var theAnswer2 = "parenthesis"; //variable that holds the correct answer to question two
var theAnswer3 = "all of the above"; //variable that holds the correct answer to question three
var theAnswer4 = "curly brackets"; //variable that holds the correct answer to question four
var theAnswer5 = "for loops"; //variable that holds the correct answer to question five
//variable that holds the questions in an array
var questionsObject = {
    questions: { 
        0 : "Commonly used data types DO Not Include:",
        1 : "The condition in an if / else statement is enclosed with __________.",
        2 : "Arrays in JavaScript can be used to store __________.",
        3 : "String values must be enclosed within __________ when being assigned to variables.",
        4 : "A very useful tool used during development and debugging for printing content to the debugger is:"
    }
};
//variable that holds four answers to each question within arrays
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

cleanStyle(); //calls the clean style function
timeRemaining.textContent = timeLeft; //updates the timer to display the time left for the user
/*//created a function to bypass the quiz to error check the highscore and entry functionality
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
        //errorChecking();
    }
});*/
//function that enters if user clicks to view highscores
viewHighscores.addEventListener("click", function() {
    highScoresDisplay = ""; //clears the highscores display
    if (localStorage.length == 0) { //checks to see if the length of the localstorage is zero
        window.alert("There are no users or scores to display"); //displays a window alert saying there is no scores
    }

    else { //enables if there are scores in localstorage
        for (var i = 0; i < localStorage.length; i++) { //runs through the localstorage and displays users and their scores
            quizUser = localStorage.key(i); //puts current user in localstorage into a variable
            userScore = localStorage.getItem(quizUser); //puts current user's score in local storage into a variable
            highScoresDisplay += (i + 1) + ". " + quizUser + " - " + userScore + "\n"; //combines the user and their score and puts them into a variable to be displayed
        }
    }

    window.alert(highScoresDisplay); //displays a window alert showing users and their scores from the localstorage
});
//function that enters if user clicks to clear highscores
clearHighscores.addEventListener("click", function() {
    localStorage.clear(); //clears the localstorage
    var ul = document.querySelector(".highScores"); //turns the html element highScores into a variable
    var listLength = ul.children.length; //gets the unordered list length and puts it into a variable
    for (i = 0; i < listLength; i++) { //runs though unordered list
        ul.removeChild(ul.children[0]); //removes added unordered lists that dont have any data to display
    }
});
//function that enters if user clicks to go back to the beginning of the quiz
goBack.addEventListener("click", function() {
    var ul = document.querySelector(".highScores"); //turns the html element highScores into a variable
    var listLength = ul.children.length; //gets the unordered list length and puts it into a variable
    for (i = 0; i < listLength; i++) { //runs though unordered list
        ul.removeChild(ul.children[0]); //removes added unordered lists that dont have any data to display
    }

    window.location.reload(); //reloads the webage to reset the styles
});
//function that enters if user clicks to submit their score
submitScore.addEventListener("click", function() {
    errorChecking(); //calls the error checking function
    if (!errorDetected) { //enters if there is no error detected
        for (var i = 0; i < localStorage.length; i++) { //runs through for the length of the localstorage
            var checkUser = localStorage.key(i); //puts the localstorage user into a variable
            if (checkUser == enterInitialsTextArea.value) { //checks to see if the current user has a submitted score in localstorage already
                var oldScore = localStorage.getItem(enterInitialsTextArea.value); //takes the original score for current user from localstorage and puts it into a variable
                if (enterInitialsTextArea.value == checkUser && score <= oldScore) { //checks to see if the current user's old score from localstorage is equal to or more than their new score
                    window.alert("Your recent score of " + score + " is less than a previous entry for user initial " + enterInitialsTextArea.value + ". Entry will not be added."); //displays old score of current user was better than current score
                    //break; //breaks from checking further
                }
                
                else if (enterInitialsTextArea.value == checkUser && score > oldScore) { //checks to see if the current user's old score from localstorage is less than their new score
                    localStorage.setItem(enterInitialsTextArea.value, score); //sends the current user's score to localstorage to replace old score
                    window.alert("New high score of " + score + " has been submitted!.\nYour previous score was " + oldScore); //displays current score of current user was better than old score
                    //break; //breaks from checking further
                }
            }
        }

        if (checkUser != enterInitialsTextArea.value) { //checks to see if current user does not exist in localstorage
            localStorage.setItem(enterInitialsTextArea.value, score); //saves current user and score to localstorage
            window.alert("Your score of " + score + " has been submitted!"); //displays current user and their new score
        }
            
        showScores(); //calls the function that displays the highscores
    }
});
//function that enters when mouse is over the submit score button
submitScore.addEventListener("mouseover", function() {
    correctORwrong.style.display = "none"; //hides the correct or wrong display
});
//function that enters when mouse is over the 1st answer button
answer1.addEventListener("mouseover", function() {
    correctORwrong.style.display = "none"; //hides the correct or wrong display
});
//function that enters when mouse is over the 2nd answer button
answer2.addEventListener("mouseover", function() {
    correctORwrong.style.display = "none"; //hides the correct or wrong display
});
//function that enters when mouse is over the 3rd answer button
answer3.addEventListener("mouseover", function() {
    correctORwrong.style.display = "none"; //hides the correct or wrong display
});
//function that enters when mouse is over the 4th answer button
answer4.addEventListener("mouseover", function() {
    correctORwrong.style.display = "none"; //hides the correct or wrong display
});
//function that checks for errors
function errorChecking () {
    errorDetected = false; //sets the error detection to false in case it was true
    function containsSpecialChars(str) { //function that checks if user entered a special character
        const specialChars = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/; //list of special characters
        return specialChars.test(str); //returns true if the user enters a special character
    }

    function containsNumbers(str) { //function that checks if user entered a number
        const numberCheck = /[0-9]/; //list of numbers
        return numberCheck.test(str); //returns true if the user enters a number
    }    

    if (containsSpecialChars(enterInitialsTextArea.value)) { //checks to see if error detection caught the user enterting a speical character
        errorDetected = true; //error detected is true
    }

    if (containsNumbers(enterInitialsTextArea.value)) { //checks to see if error detection caught the user enterting a number
        errorDetected = true; //error detected is true
    }

    if (enterInitialsTextArea.value == "") { //checks to see if the user didn't enter anything
        errorDetected = true; //error detected is true
    }
}
//function that displays the highscores in the html
function showScores () {
    cleanStyle(); //calls the cleanstyle function
    document.getElementById("questionsDisplay").style.gridRow = 2; //sets style for the display
    document.getElementById("questionsDisplay").style.placeSelf = "start"; //sets style for the display
    document.getElementById("questionsDisplay").style.fontSize = "xx-large"; //sets style for the display
    finalScoreDisplay.style.display = "none"; //hides certain display
    enterInitials.style.display = "none"; //hides certain display
    goBack.style.display = ""; //clears certain display
    clearHighscores.style.display = ""; //clears certain display
    questionsDisplay.textContent = "High scores"; //set display to say something
    goBack.textContent = "Go back"; //set display to say something
    clearHighscores.textContent = "Clear high scores"; //set display to say something
    if (localStorage.length != 0) { //checks to see if there are any users in localstorage
        for (var i = 0; i < localStorage.length; i++) { //runs through localstorage
            quizUser = localStorage.key(i); //puts current user in localstorage into a variable
            userScore = localStorage.getItem(quizUser); //puts current user's score in local storage into a variable
            var listItem = document.createElement('li'); //creates a list item in the html and assigns it to a variable
            listItem.textContent = (i + 1) + ". " + quizUser + " - " + userScore; //sets current user and score in localstorage to the current list item variable
            createList.appendChild(listItem); //displays current user and socre to the html page
        }
    }
}
//function that enters when current user answered correctly
function answeredCorrect () {
    correctORwrong.style.display = ""; //clears certain display
    correctORwrong.textContent = "Correct!"; //set display to say something
    correctORwrong.style.borderTop = "solid #800080"; //sets style for the display
    score += 10; //adds 10 to the user's current score
    questionNumber++; //goes to next question
    answerNumber++; //goes to next correct answer
    if (questionNumber == 5) { //checks to see if all questions were asked
        quizEnded = true; //quiz has ended is true
    }
}
//function that enters when current user answered wrong
function answeredWrong () {
    correctORwrong.style.display = ""; //clears certain display
    correctORwrong.textContent = "Wrong!"; //set display to say something
    correctORwrong.style.borderTop = "solid #800080"; //sets style for the display
    timeLeft -= 10; //subtracts 10 from the time remaining
    questionNumber++; //goes to next question
    answerNumber++; //goes to next correct answer
    if (questionNumber == 5) { //checks to see if all questions were asked
        quizEnded = true; //quiz has ended is true
    }
}
//function that sets the answer buttons styles and displays
function setButtons () {
    if (!quizEnded) { //checks to make sure the quiz has not ended
        answer1.style.display = ""; //clears certain display
        answer2.style.display = ""; //clears certain display
        answer3.style.display = ""; //clears certain display
        answer4.style.display = ""; //clears certain display
        answer1.textContent = answersObject.answers[answerNumber][0]; //set display to current set of answers
        answer2.textContent = answersObject.answers[answerNumber][1]; //set display to current set of answers
        answer3.textContent = answersObject.answers[answerNumber][2]; //set display to current set of answers
        answer4.textContent = answersObject.answers[answerNumber][3]; //set display to current set of answers
    }
}
//function that sets the question style and display
function setQuestions () {
    if (!quizEnded) { //checks to make sure the quiz has not ended
        labelDisplay1.style.display = "none"; //hides certain display
        labelDisplay2.style.display = "none"; //hides certain display
        questionsDisplay.style.display = "none" //hides certain display
        questionsDisplay.textContent = questionsObject.questions[questionNumber]; //set display to current question
        questionsDisplay.style.display = ""; //clears certain display
    }
}
//function that cleans all the styles to make sure everything appears coherrent
function cleanStyle() {
    answer1.style.display = "none"; //hides certain display
    answer2.style.display = "none"; //hides certain display
    answer3.style.display = "none"; //hides certain display
    answer4.style.display = "none"; //hides certain display
    submitScore.style.display = "none"; //hides certain display
    clearHighscores.style.display = "none"; //hides certain display
    goBack.style.display = "none"; //hides certain display
    correctORwrong.style.display = "none"; //hides certain display
    enterInitialsTextArea.style.display = "none"; //hides certain display
}
//functions enters when user clicks the start button and then calls the startTheQuiz function
startQuiz.addEventListener("click", startTheQuiz);
//function that starts the quiz for the current user
function startTheQuiz() {
    score = 0; //starts current user at 0 for their current score
    timeLeft = 60; //sets the timer to 60
    timeRemaining.textContent = timeLeft; //displays current remaining time
    startQuiz.style.display = "none"; //hides certain display
    finalScoreDisplay.style.display = "none"; //hides certain display
    enterInitials.style.display = "none"; //hides certain display
    setQuestions(); //calls the function that sets the question on the screen
    setButtons (); //calls the function that sets the answer buttons on the screen
    startTimer(); //calls the function that starts the timer
  }
//function starts a timer
function startTimer() {
    timer = setInterval(function() { //function calls the set interval and puts it into a variable
        timeLeft--; //subtracts one from the time remaining
        timeRemaining.textContent = timeLeft; //displays current remaining time
        if (timeLeft >= 0) { //checks to see if there is still time remaining
            if (quizEnded) { //checks to see if the quiz has ended
                clearInterval(timer); //clears the set interval for the timer
                finishedQuiz(); //calls the finishedQuiz function
            }
        }

        if (timeLeft === 0) { //checks to see if time remaining has reached zero
            clearInterval(timer); //clears the set interval for the timer
            finishedQuiz(); //calls the finishedQuiz function
        }
    }, 1000); //delays for 1 second before running again
}
//function enters when quiz has finished
function finishedQuiz () {
    cleanStyle(); //calls cleanStyle function
    document.getElementById("questionsDisplay").style.gridRow = 4; //sets style for the display
    document.getElementById("questionsDisplay").style.placeSelf = "start"; //sets style for the display
    document.getElementById("questionsDisplay").style.fontSize = "xx-large"; //sets style for the display
    questionsDisplay.textContent = "All done!"; //set display to say something
    finalScoreDisplay.style.display = ""; //clears certain display
    enterInitials.style.display = ""; //clears certain display
    enterInitialsTextArea.style.display = ""; //clears certain display
    finalScoreDisplay.textContent = "Your final score is " + score; //set display to say something
    enterInitials.textContent = "Enter initials: "; //set display to say something
    submitScore.style.display = ""; //clears certain display
    submitScore.textContent = "Submit"; //set display to say something
}
//function that enters when current user clicks the first answer button
answer1.addEventListener("click", function() {
    if (!quizEnded) { //checks to make sure the quiz hasn't ended
        var userAnswer = answer1.textContent; //puts the text for answer button one to a variable
        if (questionNumber == 0 && theAnswer1 == userAnswer) { //checks to see if the current question is the 1st question and that it's answer is the answer button that was clicked
            answeredCorrect(); //calls function for right answer
        }

        else if (questionNumber == 1 && theAnswer2 == userAnswer) { //checks to see if the current question is the 2nd question and that it's answer is the answer button that was clicked
            answeredCorrect(); //calls function for right answer
        }

        else if (questionNumber == 2 && theAnswer3 == userAnswer) { //checks to see if the current question is the 3rd question and that it's answer is the answer button that was clicked
            answeredCorrect(); //calls function for right answer
        }

        else if (questionNumber == 3 && theAnswer4 == userAnswer) { //checks to see if the current question is the 4th question and that it's answer is the answer button that was clicked
            answeredCorrect(); //calls function for right answer
        }

        else if (questionNumber == 4 && theAnswer5 == userAnswer) { //checks to see if the current question is the 5th question and that it's answer is the answer button that was clicked
            answeredCorrect(); //calls function for right answer
        }

        else {  //if user clicked a wrong answer
            answeredWrong(); //calls function for wrong answer
        }

        setButtons (); //calls to set the new answers buttons
        setQuestions (); // calls to set the new question
    }
});
//function that enters when current user clicks the second answer button
answer2.addEventListener("click", function() {
    if (!quizEnded) { //checks to make sure the quiz hasn't ended
        var userAnswer = answer2.textContent; //puts the text for answer button two to a variable
        if (questionNumber == 0 && theAnswer1 == userAnswer) { //checks to see if the current question is the 1st question and that it's answer is the answer button that was clicked
            answeredCorrect(); //calls function for right answer
        }

        else if (questionNumber == 1 && theAnswer2 == userAnswer) { //checks to see if the current question is the 2nd question and that it's answer is the answer button that was clicked
            answeredCorrect(); //calls function for right answer
        }

        else if (questionNumber == 2 && theAnswer3 == userAnswer) { //checks to see if the current question is the 3rd question and that it's answer is the answer button that was clicked
            answeredCorrect(); //calls function for right answer
        }

        else if (questionNumber == 3 && theAnswer4 == userAnswer) { //checks to see if the current question is the 4th question and that it's answer is the answer button that was clicked
            answeredCorrect(); //calls function for right answer
        }

        else if (questionNumber == 4 && theAnswer5 == userAnswer) { //checks to see if the current question is the 5th question and that it's answer is the answer button that was clicked
            answeredCorrect(); //calls function for right answer
        }

        else {
            answeredWrong(); //calls function for wrong answer
        }

        setButtons (); //calls to set the new answers buttons
        setQuestions (); // calls to set the new question
    }
});
//function that enters when current user clicks the third answer button
answer3.addEventListener("click", function() {
    if (!quizEnded) { //checks to make sure the quiz hasn't ended
        var userAnswer = answer3.textContent; //puts the text for answer button three to a variable
        if (questionNumber == 0 && theAnswer1 == userAnswer) { //checks to see if the current question is the 1st question and that it's answer is the answer button that was clicked
            answeredCorrect(); //calls function for right answer
        }

        else if (questionNumber == 1 && theAnswer2 == userAnswer) { //checks to see if the current question is the 2nd question and that it's answer is the answer button that was clicked
            answeredCorrect(); //calls function for right answer
        }

        else if (questionNumber == 2 && theAnswer3 == userAnswer) { //checks to see if the current question is the 3rd question and that it's answer is the answer button that was clicked
            answeredCorrect(); //calls function for right answer
        }

        else if (questionNumber == 3 && theAnswer4 == userAnswer) { //checks to see if the current question is the 4th question and that it's answer is the answer button that was clicked
            answeredCorrect(); //calls function for right answer
        }

        else if (questionNumber == 4 && theAnswer5 == userAnswer) { //checks to see if the current question is the 5th question and that it's answer is the answer button that was clicked
            answeredCorrect(); //calls function for right answer
        }

        else {
            answeredWrong(); //calls function for wrong answer
        }
        
        setButtons (); //calls to set the new answers buttons
        setQuestions (); // calls to set the new question
    }
});
//function that enters when current user clicks the fourth answer button
answer4.addEventListener("click", function() {
    if (!quizEnded) { //checks to make sure the quiz hasn't ended
        var userAnswer = answer4.textContent; //puts the text for answer button four to a variable
        if (questionNumber == 0 && theAnswer1 == userAnswer) { //checks to see if the current question is the 1st question and that it's answer is the answer button that was clicked
            answeredCorrect(); //calls function for right answer
        }

        else if (questionNumber == 1 && theAnswer2 == userAnswer) { //checks to see if the current question is the 2nd question and that it's answer is the answer button that was clicked
            answeredCorrect(); //calls function for right answer
        }

        else if (questionNumber == 2 && theAnswer3 == userAnswer) { //checks to see if the current question is the 3rd question and that it's answer is the answer button that was clicked
            answeredCorrect(); //calls function for right answer
        }

        else if (questionNumber == 3 && theAnswer4 == userAnswer) { //checks to see if the current question is the 4th question and that it's answer is the answer button that was clicked
            answeredCorrect(); //calls function for right answer
        }

        else if (questionNumber == 4 && theAnswer5 == userAnswer) { //checks to see if the current question is the 5th question and that it's answer is the answer button that was clicked
            answeredCorrect(); //calls function for right answer
        }

        else {
            answeredWrong(); //calls function for wrong answer
        }

        setButtons (); //calls to set the new answers buttons
        setQuestions (); // calls to set the new question
    }
});