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
    
      // add letter buttons/key board
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

    // random word by computer   
    guessAWord: function() {
        var computerRandomNumber = Math.floor(Math.random() * this.words.length);
        return this.words[computerRandomNumber];
        console.log(this.computerWord);
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







   
}
     
// loading on event
window.onload = function(event){
    game.addLetterButtons();
    game.toStart();

    // document.onkeyup = function(element){
    //     game.userGuess = element.key.toUpperCase();
    //     game.toStartGame();
    // }
}