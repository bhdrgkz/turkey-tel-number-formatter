function ttnf(telNumber) {
  "use strict";
  telNumber = telNumber.replace(/\D/g,'');
  telNumber = telNumber.slice(-10);
  output = [],
  sNumber = telNumber.toString();
  for (var i = 0, len = sNumber.length; i < len; i += 1) {
      output.push(+sNumber.charAt(i));
  }
  var newFormat = "0 (" + output[0]+output[1]+output[2] + ") " + output[3]+output[4]+output[5] + " " + output[6]+output[7] + " " + output[8]+output[9];
  return newFormat;
}
