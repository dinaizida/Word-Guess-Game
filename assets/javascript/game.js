var winsCount = 0;
var lossesCount = 0;
var timeOver;

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
       'Virginia'
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

    // settings for properties to start game
    toStart: function() {
        this.numberGuesses = 10;
        this.userGuessesArray = [];
        this.matchedLettersCount = 0;
        this.userGuess = "";
        this.wordWithMatchedLetters = "";
        this.gameOver = false;
        this.winOrLose = false;
        this.computerWord = this.guessAWord();
        this.computerWordLength = this.calculateWordLength();
        var initialWordToPrint = this.createInitialWordToPrint();
        this.printWord(initialWordToPrint);

         // setting elements on the screen  
         document.querySelector("#gameStatus").innerHTML = "";
         document.querySelector("#numberGuesses").innerHTML = this.numberGuesses;
         document.querySelector("#winsCount").innerHTML = winsCount;
         document.querySelector("#lossesCount").innerHTML = lossesCount;
         document.querySelector("#winlosses").style.display = 'inline-block';
    },
    //  check if userGuess is a letter

    isAlphabet: function() {
        var pattenRE = /[a-z]/i;
        return this.userGuess.match(pattenRE);
    },

    toStartGame: function(){

    }
}
     