var winsTotal = 0;
var lostTotal = 0;


// Game object
var game = {
    words: [
        'Alabama',
        'Alaska',
        'Arizona',
        'Arkansas',
        'California',
        'Colorado',
        'Texas',
        'Utah',
        'Vermont',
        'Virginia',
        'Delaware',
        'Florida',
        'Georgia',
        'Illinois',
        'Montana'
    ],
    letters: ['A', 'B', 'C', 'D', 'E',
        'F', 'G', 'H', 'I', 'J', 'K',
        'L', 'M', 'N', 'O', 'P', 'Q',
        'R', 'S', 'T', 'U', 'V', 'W',
        'X', 'Y', 'Z'
    ],
    numberGuesses: 10,
    userGuessesArray: [],
    userGuess: "",
    computerWord: "",
    wordWithMatchedLetters: "",
    computerWordLength: 0,
    matchedLettersCount: 0,
    gameOver: false,
    winOrLose: false,

    // initalies game settings in the begining of each game
    toStart: function() {
        this.numberGuesses = 10;
        this.userGuessesArray = [];
        this.matchedLettersCount = 0;
        this.userGuess = "";
        this.wordWithMatchedLetters = "";
        this.gameOver = false;
        this.winOrLose = false;
        this.computerWord = this.computerWordChoice();
        this.computerWordLength = this.calculateWordLength();

        var WordToPrint = this.createWordToPrint();
        this.printWord(WordToPrint);

        // display screen elements (game status)
        document.querySelector("#gameStatus").innerHTML = "";
        document.querySelector("#numberGuesses").innerHTML = this.numberGuesses;
        document.querySelector("#winsTotal").innerHTML = winsTotal;
        document.querySelector("#lostTotal").innerHTML = lostTotal;
        document.querySelector("#winlosses").style.display = 'inline-block';

    },

    //  display a keyboard on the screen
    addLetterButtons: function() {
        // add letter buttons
        var html = "<ul>";
        for (var i = 0; i < this.letters.length; i++) {
            html += '<li id="li-' + this.letters[i] + '" class="liActive"';
            html += 'onclick="game.letterClick(\'' + this.letters[i] + '\')">';
            html += this.letters[i] + "</li>";
        };
        html += "</ul>";
        document.querySelector("#keyboardBtn").innerHTML = html;
    },

    // make button disable after user click on it and continue with the game
    letterClick: function(letter) {
        this.userGuess = letter.toUpperCase();
        this.disablekeyboardBtn();
        this.toStartGame();
    },
    // random word by computer   
    computerWordChoice: function() {
        var computerRandomNumber = Math.floor(Math.random() * this.words.length);
        return this.words[computerRandomNumber];

    },

    //length of the word
    calculateWordLength: function() {
        return this.computerWord.length;
    },

    // create a string with all dashes 
    createWordToPrint: function() {
        var word = "";
        for (var i = 0; i < this.computerWordLength; i++) {
            word += '_ ';
        }
        this.wordWithMatchedLetters = word;
        return word;
    },

    // print a word into <span > element by ID 
    printWord: function(word) {
        document.querySelector("#word").innerHTML = word;
    },

    // check to see if user already tried to clik on keyboard
    userGuessTried: function() {
        if (this.userGuessesArray.length !== 0) {
            var result = this.userGuessesArray.indexOf(this.userGuess) < 0 ? false : true;
            return result;
        } else {
            return false;
        }
    },

    //check if input is a letter
    isAlphabet: function() {
        var pattenRE = /[a-z]/i;
        return this.userGuess.match(pattenRE);
    },

    // disables keyboard button that user has clicked
    disablekeyboardBtn: function() {
        var id = "#li-" + this.userGuess;
        document.querySelector(id).className = "liDisabled";
    },

    // shows/highlight keyboard button that user has clicked correctly- matches the letter from computer word
    selectedkeyboardBtn: function() {
        var id = "#li-" + this.userGuess;
        document.querySelector(id).className = "liSelected";
    },

    // collect all user clicked letters
    userChoicesArray: function() {
        this.userGuessesArray.push(this.userGuess);
    },

    //check if word contains the letter user entered
    checkWordContainsuserGuess: function() {
        var contains = false;
        for (var i = 0; i < this.computerWordLength; i++) {
            if (this.computerWord.charAt(i).toUpperCase() == this.userGuess) {
                contains = true;
            }
        }
        return contains;

    },

    // print number of numberGuesses left
    printnumberGuessesLeft: function() {
        this.numberGuesses--;
        this.playAudio('assets/sounds/letterINcorrect.mp3');

        document.querySelector("#numberGuesses").innerHTML = this.numberGuesses;
    },

    //replace dashes with letters,skipping spaces between dashes( i * 2)

    createWordWithMatchedLetters: function() {
        for (var i = 0; i < this.computerWordLength; i++) {
            if (this.computerWord.charAt(i).toUpperCase() == this.userGuess) {
                if (i === 0) {
                    this.wordWithMatchedLetters = this.wordWithMatchedLetters.substring(0, i * 2) +
                        this.userGuess.toUpperCase() + this.wordWithMatchedLetters.substring((i * 2 + 1));

                } else {
                    this.wordWithMatchedLetters = this.wordWithMatchedLetters.substring(0, i * 2) +
                        this.userGuess.toLowerCase() + this.wordWithMatchedLetters.substring((i * 2 + 1));

                }
                this.playAudio('assets/sounds/letterCorrect.mp3');
                this.selectedkeyboardBtn();
                this.matchedLettersCount++;
            }
        }
    },

    // play audio sound
    playAudio: function(gameAudio) {
        var audio = new Audio(gameAudio);
        audio.play();
        audio.volume = .5;
    },

    // calculate win/lose with sounds/audio  
    winLossesCountWithSound: function() {
        if (this.numberGuesses === 0) {
            this.playAudio('assets/sounds/gameLost.mp3');
            lostTotal++;
            this.gameOver = true;
            this.winOrLose = false;
        }

        if (this.matchedLettersCount == this.computerWordLength) {
            this.playAudio('assets/sounds/gameWon.mp3');
            winsTotal++;
            this.winOrLose = true;
            this.gameOver = true;
        }
    },

    // start game again 
    startGameAgain: function() {
        if (this.gameOver === true) {
            var html = "";
            document.querySelector("#winlosses").style.display = 'none';

            if (this.winOrLose) {
                html += '<div class="message">You Won!</div>' + '<button id="clear" type="button" class="btn btn-raised btn-secondary">Start Game</button>';

                var main = $("body");
                var btns = main.find("#clear");
                main.on("click", "#clear", function() {
                    game.loadKeyboard();
                });

            } else {
                html += '<div class="message">You Lost!</div>' + '<br>' + '<button id="clear" type="button" class="btn btn-raised btn-secondary">Start Game</button>';
            }

            var main = $("body");
                var btns = main.find("#clear");
                main.on("click", "#clear", function() {
                    game.loadKeyboard();
                });

            document.querySelector("#gameStatus").innerHTML = html;
            
        }
    },
    // refresh keyboard for a new game and run toStart method to refresh all initial settings
    loadKeyboard: function() {
        // var t = this;
        for (var i = 0; i < this.letters.length; i++) {
            var id = "#li-" + this.letters[i];
            document.querySelector(id).className = "liActive";
        };
        this.toStart();
    },

    // check if the userGuess is an alphabet and game ended- next need to check all game conditions
    toStartGame: function() {
        if (this.gameOver === false && this.isAlphabet()) {
            this.checkRules();
        }
    },

    // check all conditions for the game 
    checkRules: function() {
        if (!this.userGuessTried()) { // if letter is not tried
            this.disablekeyboardBtn();
            this.userChoicesArray(); // array for tried values

            if (!this.checkWordContainsuserGuess()) { // if user entered letter is not in the word
                this.printnumberGuessesLeft();
                this.winLossesCountWithSound();
                this.startGameAgain();

            } else { // if user entered letter is in the word
                this.createWordWithMatchedLetters();
                this.winLossesCountWithSound(); // if user answer is correct
                this.startGameAgain();
                document.querySelector("#word").innerHTML = this.wordWithMatchedLetters;
            }
        }
    },

}

// executes when HTML-Document is loaded and DOM is ready- runs only once in the begining
window.onload = function(event) {
    game.addLetterButtons(); //  display a keyboard on the screen
    game.toStart(); // initiate all settings to start the game

    document.onkeyup = function(element) {
        game.userGuess = element.key.toUpperCase();
        game.toStartGame();

    }
}