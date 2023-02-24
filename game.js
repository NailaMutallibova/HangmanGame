var word = document.querySelector('.word');
var wrong = document.querySelector('.wrong');
var health = document.querySelector('.health');
var win = document.querySelector('.win');
var lose = document.querySelector('.lose');

var arr = ['woman', 'rabbit', 'strawberry', 'phone', 'shoes', 'baby', 'purple', 'blue', 'lion', 'towel', 'door',
    'window', 'chair', 'dress', 'limon', 'charger', 'notebook', 'armchair', 'belt', 'shirt', 'skirt', 'pineapple'
];



var chosenWord = "";
// This will break the solution into individual letters to be stored in array.
var lettersInChosenWord = [];
// This will be the number of blanks we show based on the solution
var numBlanks = 0;
// Holds a mix of blank and solved letters (ex: 'n, _ _, n, _').
var blanksAndSuccesses = [];
// Holds all of the wrong guesses
var wrongGuesses = [];


// Game counters
var winCounter = 0;
var lossCounter = 0;
var numGuesses = 10;



function startGame() {
    // Reset the guesses back to 0.
    numGuesses = 10;

    // Solution is chosen randomly from wordList.
    chosenWord = arr[Math.floor(Math.random() * arr.length)];

    // The word is broken into individual letters.
    lettersInChosenWord = chosenWord.split("");
    // We count the number of letters in the word.
    numBlanks = lettersInChosenWord.length;

    // We print the solution in console (for testing).
    console.log(chosenWord);

    // CRITICAL LINE - Here we *reset* the guess and success array at each round.
    blanksAndSuccesses = [];

    // CRITICAL LINE - Here we *reset* the wrong guesses from the previous round.
    wrongGuesses = [];

    // Fill up the blanksAndSuccesses list with appropriate number of blanks.
    // This is based on number of letters in solution.
    for (var i = 0; i < numBlanks; i++) {
        blanksAndSuccesses.push("_");
    }

    // Print the initial blanks in console.
    console.log(blanksAndSuccesses);

    // Prints the blanks at the beginning of each round in the HTML
    word.innerHTML = blanksAndSuccesses.join(" ");
    // Reprints the guessesLeft to 10
    health.innerHTML = numGuesses;

    // Prints the blanks at the beginning of each round in the HTML
    word.innerHTML = blanksAndSuccesses.join(" ");

    // Clears the wrong guesses from the previous round
    wrong.innerHTML = wrongGuesses.join(" ");

}



function checkLetters(letter) {

    // This boolean will be toggled based on whether or not a user letter is found anywhere in the word.
    var letterInWord = false;

    // Check if a letter exists inside the array at all.
    for (var i = 0; i < numBlanks; i++) {
        if (chosenWord[i] === letter) {
            // If the letter exists then toggle this boolean to true. This will be used in the next step.
            letterInWord = true;
        }
    }

    // If the letter exists somewhere in the word, then figure out exactly where (which indices).
    if (letterInWord) {

        // Loop through the word.
        for (var j = 0; j < numBlanks; j++) {

            // Populate the blanksAndSuccesses with every instance of the letter.
            if (chosenWord[j] === letter) {
                // Here we set the specific space in blanks and letter equal to the letter when there is a match.
                blanksAndSuccesses[j] = letter;
                console.log(blanksAndSuccesses)
            }
        }
        // Logging for testing.
        console.log(blanksAndSuccesses);
    }
    // If the letter doesn't exist at all...
    else {
        // ..then we add the letter to the list of wrong letters, and we subtract one of the guesses.
        wrongGuesses.push(letter);
        numGuesses--;
    }
}


function roundComplete() {

    // First, log an initial status update in the console telling us how many wins, losses, and guesses are left.
    console.log("WinCount: " + winCounter + " | LossCount: " + lossCounter + " | NumGuesses: " + numGuesses);

    // Update the HTML to reflect the new number of guesses. Also update the correct guesses.
    health.innerHTML = numGuesses;
    // This will print the array of guesses and blanks onto the page.
    word.innerHTML = blanksAndSuccesses.join(" ");
    // This will print the wrong guesses onto the page.
    wrong.innerHTML = wrongGuesses.join(" ");

    // If we have gotten all the letters to match the solution...
    if (lettersInChosenWord.toString() === blanksAndSuccesses.toString()) {

        winCounter++;

        // Update the win counter in the HTML & restart the game.
        win.innerHTML = winCounter;

        alert("You win!");

        startGame();
    }

    // If we've run out of guesses..
    else if (numGuesses === 0) {

        lossCounter++;

        // Update the loss counter in the HTML.
        lose.innerHTML = lossCounter;

        alert("You lose");
        // Restart the game.
        startGame();
    }

}




startGame();

window.onkeypress = function(e) {
    var letterGuessed = String.fromCharCode(e.which).toLowerCase();
    checkLetters(letterGuessed);
    roundComplete();
}


/* if (arr[number].indexOf(e.key) == -1) {
        --life
        health.innerText = life
        wrong.innerText += e.key
        if (life == 0) {
            alert('You lost')
            number = Math.floor(Math.random() * arr.length);
            word.innerText = '_ '.repeat(arr[number].length);
            life = 10
            health.innerText = life
            wrong.innerText = ' '
            losses++
            lose.innerText = losses
            startGame();

        }
    } else {
        find++
        number = Math.floor(Math.random() * arr.length);
        for (i = 0; i < number.length; i++) {
            word.innerText = `${number[i]}`.repeat(arr[number].length);
        }
        if (arr[number].length == find) {
            alert('You win')
            number = Math.floor(Math.random() * arr.length);
            word.innerText = '_ '.repeat(arr[number].length);
            wrong.innerText = ' '
            life = 10
            health.innerText = life
            wins++
            win.innerText = wins
            find = 0

        }
        startGame();

    }
    var letterGuessed = String.fromCharCode(e.which).toLowerCase();
    // Runs the code to check for correctness.
    checkLetters(letterGuessed); */