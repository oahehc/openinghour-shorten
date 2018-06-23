// exports.printMsg = function() {
//   console.log("This is a message from the demo package");
// }
/**
 * Adds commas to a number
 * @param {number} number
 * @param {string} locale
 * @return {string}
 */
module.exports = function(number, locale) {
  return number.toLocaleString(locale);
};