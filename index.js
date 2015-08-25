/*jslint indent: 2 */

var ttnf = {};

ttnf.format = function (telNumber) {
  "use strict";

  if (!telNumber) {
    return '';
  }

  if (typeof telNumber !== 'string' && typeof telNumber !== 'number') {
    return '';
  }

  var numArr = telNumber
      .toString()
      .replace(/\D/g, '') // Removes non-numeric
      .slice(-10), // Last 10 chars
    arrLen = numArr.length,
    prefix = '',
    suffix,
    last7 = numArr.slice(-7);

  if (arrLen !== 7 && arrLen !== 10) {
    return numArr;
  }

  if (arrLen === 10) {
    prefix = '0 (' + numArr.substr(0, 3) + ') ';
  }

  suffix = last7.substr(0, 3) + ' ' + last7.substr(3, 2) + ' ' + last7.substr(5, 2);

  return prefix + suffix;
};

module.exports = ttnf.format;