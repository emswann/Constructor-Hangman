function Letter(char) {
  if (!(this instanceof Letter)) { 
    return new Letter(char);
  }
  this.char      = char;
  this.isGuessed = false;
}

Letter.prototype.toString = function() {
  return this.isGuessed ? this.char : '_';
}

Letter.prototype.checkChar = function(char) {
  var found = false;

  if (this.char === char) {
    this.isGuessed = true;
    found = true;
  }

  return found;
}

module.exports = {
  Letter
}



