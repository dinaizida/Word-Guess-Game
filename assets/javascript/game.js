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

    // initalies game properties
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

        // set screen elements
        document.querySelector("#gameStatus").innerHTML = "";
        document.querySelector("#numberGuesses").innerHTML = this.numberGuesses;
        document.querySelector("#winsCount").innerHTML = winsCount;
        document.querySelector("#lossesCount").innerHTML = lossesCount;
        document.querySelector("#winlosses").style.display = 'inline-block';
       
    },

     // when user clicks letter Button 
     letterClick: function(letter) {
        this.userGuess = letter.toUpperCase();
        this.disablekeyboardBtn();
        this.toStartGame();
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

    
    

}

// Window load all
window.onload = function(event) {
        game.addLetterButtons();
        game.toStart();

document.onkeyup = function(element) {
        game.userGuess = element.key.toUpperCase();
        game.toStartGame();
        
        }        
    } 
