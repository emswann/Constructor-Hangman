const inquirer = require('inquirer');

const file = require('./file.js');
const word = require('./word.js');

var getAnswer = data => {
  var lines = data.split('\n');
  var randomInt = Math.floor(Math.random() * lines.length);

  return lines[randomInt];
};

var processGuess = (prevGuesses, remGuesses, answer) => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'guess',
      message: 'Guess a letter (or type quit):'
    }
  ]).then(response => {
    var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    var guess = response.guess.toLowerCase();

    if (guess !== 'quit') {
      if (alphabet.indexOf(guess) === -1) {
        console.log('\nYou have to guess a letter of the alphabet!\n');
      }
      else if (prevGuesses.indexOf(guess) >= 0) {
        console.log('\nYou have already guessed this letter!\n');
      }
      else {
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
        main(); 
      }
      else {
        processGuess(prevGuesses, remGuesses, answer);
      }
    }
    // else do nothing becauser user wants to quit.    
  }).catch(error => {
    console.log(error);
  });
};

async function main() {
  try {
    const INPUT_FILE = './words.txt';

    // var data = await file.readFile(INPUT_FILE);
    // var answer = new Word(getAnswer(data));
    var answer = new word.Word('elephant');
    var prevGuesses = [];
    var remGuesses = 10;

    console.log('\n' + answer.getWord() + '\n');
    processGuess(prevGuesses, remGuesses, answer);   
  }
  catch(error) {
    console.log('Processing error: ' + error  + '!');
  }
}

main();
