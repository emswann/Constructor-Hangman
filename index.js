/**
 * @file Main file for Hangman Game logic. 
 * @author Elaina Swann
 * @version 1.0 
*/

const inquirer = require('inquirer');

const file = require('./file');
const Word = require('./word');

/** 
 * @function getAnswer 
 * @description Randomly chooses word from input data file.
 * @param {string} data Contents of input data file.
 * @returns {string} Answer for hangman game.
*/
var getAnswer = data => {
  var lines = data.split('\n');
  var randomInt = Math.floor(Math.random() * lines.length);
  return lines[randomInt].toLowerCase();
};

/** 
 * @function isValid 
 * @description Checks if guess is a letter of the alphabet or if it has already been guessed.
 * @param {string} guess Letter guessed by user.
 * @param {array} prevGuesses List of previously guessed letters.
 * @returns {boolean} Boolean indicating if guess is valid.
*/
var isValid = (guess, prevGuesses) => {
  const ALPHABET = "abcdefghijklmnopqrstuvwxyz".split("");
  var isValid    = true;

  if (ALPHABET.indexOf(guess) === -1) {
    console.log('\nYou have to guess a letter of the alphabet!\n');
    isValid = false;
  }
  else if (prevGuesses.indexOf(guess) >= 0) {
    console.log('\nYou have already guessed this letter!\n');
    isValid = false;
  }
  /* else isValid initialized to true */

  return isValid;
}

/** 
 * @function processGuess
 * @description Processes mid-level portion of Hangman game - where game has already been reset and user is guessing a word. This function is called recursively while user is guessing letters.
 * @param {array} prevGuesses List of previously guessed letters.
 * @param {number} remGuesses Number of remaining guesses.
 * @param {Object} answer Word object representing word trying to guess.
*/
var processGuess = (prevGuesses, remGuesses, answer) => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'guess',
      message: 'Guess a letter (or type quit):'
    }
  ]).then(response => {
    var guess = response.guess.toLowerCase();

    if (guess !== 'quit') {
      if (isValid(guess, prevGuesses)) {
        prevGuesses.push(guess);

        var found = answer.checkWord(guess);
        console.log('\n' + answer.getWord() + '\n');

        if (found) {
          console.log('\nCORRECT!!!\n');
        }
        else {
          remGuesses--;
          console.log('\nINCORRECT!!!\n' + remGuesses + ' guesses remaining!!!\n');
        }
      }

      if (answer.getWord().indexOf('_') === -1) {
        console.log('\nYou got it right! Next word!\n');
        main(); /* Need to restart game. */
      }   
      else if (remGuesses <= 0) {
        console.log('\nSorry, you are out of guesses! The word was: ' + answer.solveWord() + '.\n');
        main(); /* Need to restart game. */
      }
      else {
        /* Call recursively to get next user input. */
        processGuess(prevGuesses, remGuesses, answer);
      }
    }
    /* else do nothing becauser user wants to quit */    
  }).catch(error => {
    console.log(error);
  });
};

/** 
 * @async
 * @function main
 * @description Processes top-level portion of Hangman game - from start - where game is reset and word is chosen to guess. This function is called recursively until user quits the game.
*/
async function main() {
  try {
    const INPUT_FILE  = './words.txt';
    const MAX_GUESSES = 10;

    var data = await file.readFile(INPUT_FILE);
    var answer = new Word(getAnswer(data));
    var remGuesses = MAX_GUESSES;
    var prevGuesses = [];

    console.log('\n' + answer.getWord() + '\n');
    processGuess(prevGuesses, remGuesses, answer);   
  }
  catch(error) {
    console.log('Processing error: ' + error  + '!');
  }
}

main();