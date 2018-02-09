/**
 * @file Word constructor object. 
 * @author Elaina Swann
 * @version 1.0 
*/

const Letter = require('./letter');

/** 
 * @constructor Word
 * @param {string} strWord - Word string transformed into Word object.
*/
function Word(strWord) {
  if (!(this instanceof Word)) { 
    return new Word(strWord);
  }

  /** 
   * @method Word.createWord 
   * @description Creates array of Letter objects based on string input.
   * @param {string} strWord String to be transformed.
   * @returns {array} Letter object array.
  */
  var createWord = strWord => {
    var word = [];
    for (let i = 0; i < strWord.length; i++) {
      var letter = new Letter(strWord[i]);
      word.push(letter);
    }
    return word;
  };

  this.word = createWord(strWord);
}

/** 
 * @method getWord 
 * @description Returns string representation of Word object.
 * @returns {string} String value which Word object represents.
*/
Word.prototype.getWord = function() {
  return this.word.join(' ');
}

/** 
 * @method solveWord 
 * @description Returns chars of Word object.
 * @returns {string} String char values which Word object represents.
*/
Word.prototype.solveWord = function() {
  var strWord = '';
  this.word.forEach(letter => strWord += letter.getChar());
  return strWord;
}

/** 
 * @method checkWord 
 * @description Checks if input char matches Letter objects. If so, sets boolean to true.
 * @returns {boolean} Boolean indicating if char matched or not.
*/
Word.prototype.checkWord = function(char) {
  var found = false;

  this.word.forEach(letter => {
    if (letter.checkChar(char)) {
      found = true; /* Set to true if found in at least one letter. */
    }
  })

  return found;
}

/** 
 * @module Word
 * @exports {Object} Word constructor.
*/
module.exports = Word;
