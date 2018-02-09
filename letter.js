/**
 * @file Letter constructor object. 
 * @author Elaina Swann
 * @version 1.0 
*/

/** 
 * @constructor Letter
 * @param {string} char - Char value which Letter object represents.
*/
function Letter(char) {
  if (!(this instanceof Letter)) { 
    return new Letter(char);
  }
  this.char      = char;
  this.isGuessed = false;
}

/** 
 * @method toString 
 * @description Returns char representation of Letter object (if letter has been guessed) or '_' (if not already guessed).
 * @returns {string} Letter char or '_'.
*/
Letter.prototype.toString = function() {
  return this.isGuessed ? this.char : '_';
}

/** 
 * @method getChar 
 * @description Returns char representation of Letter object.
 * @returns {string} Letter char.
*/
Letter.prototype.getChar = function() {
  return this.char;
}

/** 
 * @method checkChar 
 * @description Checks if input char matches Letter char representation. If so, sets boolean to true.
 * @returns {boolean} Boolean indicating if char matched or not.
*/
Letter.prototype.checkChar = function(char) {
  var found = false;

  if (this.char === char) {
    this.isGuessed = true;
    found = true;
  }

  return found;
}

/** 
 * @module Letter
 * @exports {Object} Letter constructor.
*/
module.exports = Letter;