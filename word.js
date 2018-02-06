const letter = require('./letter.js');

function Word(strWord) {
  if (!(this instanceof Word)) { 
    return new Word(strWord);
  }

  var createWord = strWord => {
    var word = [];
    for (let i = 0; i < strWord.length; i++) {
      var objLetter = new letter.Letter(strWord[i]);
      word.push(objLetter);
    }
    return word;
  };

  this.word = createWord(strWord);
}

Word.prototype.getWord = function() {
  return this.word.join(' ');
}

Word.prototype.checkWord = function(char) {
  var found = false;

  this.word.forEach(letter => {
    if (letter.checkChar(char)) {
      found = true; // Sets to true if found in at least one letter.
    }
  })

  return found;
}

module.exports = {
  Word
}
