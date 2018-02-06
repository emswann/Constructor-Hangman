/**
 * @file Interface to fs. 
 * @author Elaina Swann
 * @version 1.0 
*/
const fs = require('fs');

const ENCODING = 'utf8';

/** 
 * @function readFile 
 * @description Promise function for fs.readFile.
 * @param {string} path - Input file name.
 * @returns {Promise} Data from input file or Error if occurred.
*/
const readFile = path => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, ENCODING, (error, data) => {
      if (!error) {
        resolve(data);
      }
      else {
        reject(error);
      }
    });
  });
};

module.exports = {
  readFile
}