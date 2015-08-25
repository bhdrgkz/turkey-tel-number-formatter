/*jslint indent: 2 */
/*global describe, it */

var assert = require('assert');
var ttnf = require('./');

describe('Turkey tel number formatter', function () {
  "use strict";

  it('should return empty on invalid input', function () {
    assert.strictEqual('', ttnf());
    assert.strictEqual('', ttnf(null));
    assert.strictEqual('', ttnf(undefined));
    assert.strictEqual('', ttnf(false));
    assert.strictEqual('', ttnf(''));
    assert.strictEqual('', ttnf(' '));
    assert.strictEqual('', ttnf('   '));
    assert.strictEqual('', ttnf('foo'));
    assert.strictEqual('', ttnf(' foo b a r'));
    assert.strictEqual('', ttnf({}));
    assert.strictEqual('', ttnf({foo: 2121234568}));
  });

  it('should format example', function () {
    assert.strictEqual('0 (212) 123 45 68', ttnf("65r3453532434502dfgdfg(/)/(&%/%12123fdgdf(/)/&&4568"));
  });

  it('should format normal number with spaces', function () {
    assert.strictEqual('0 (212) 123 45 68', ttnf('02121234568'));
    assert.strictEqual('0 (212) 123 45 68', ttnf('0 212 123 45 68'));
    assert.strictEqual('0 (212) 123 45 68', ttnf('0 212 123 4568'));
    assert.strictEqual('0 (212) 123 45 68', ttnf('0 212 1234568'));
    assert.strictEqual('0 (212) 123 45 68', ttnf('0 2121234568'));
  });

  it('should format normal number without spaces', function () {
    assert.strictEqual('0 (212) 123 45 68', ttnf('2121234568'));
    assert.strictEqual('0 (212) 123 45 68', ttnf('212 1234568'));
    assert.strictEqual('0 (212) 123 45 68', ttnf('212 123 4568'));
    assert.strictEqual('0 (212) 123 45 68', ttnf('212 123 45 68'));
    assert.strictEqual('0 (212) 123 45 68', ttnf('212 123 45 68'));
  });

  it('should format with country code', function () {
    assert.strictEqual('0 (212) 123 45 68', ttnf('+902121234568'));
    assert.strictEqual('0 (212) 123 45 68', ttnf('+90 2121234568'));
    assert.strictEqual('0 (212) 123 45 68', ttnf('00902121234568'));
    assert.strictEqual('0 (212) 123 45 68', ttnf('0090 2121234568'));
    assert.strictEqual('0 (212) 123 45 68', ttnf('902121234568'));
    assert.strictEqual('0 (212) 123 45 68', ttnf('90 2121234568'));
  });

  it('should format n < 7 digits', function () {
    assert.strictEqual('1', ttnf('1'));
    assert.strictEqual('12', ttnf('12'));
    assert.strictEqual('123', ttnf('123'));
    assert.strictEqual('1234', ttnf('1234'));
    assert.strictEqual('12345', ttnf('12345'));
    assert.strictEqual('123456', ttnf('123456'));
  });

  it('should format 7 < n < 10 digits', function () {
    assert.strictEqual('12345678', ttnf('12345678'));
    assert.strictEqual('123456789', ttnf('123456789'));
  });

  it('should format n > 10', function () {
    assert.strictEqual('0 (234) 567 89 01', ttnf('12345678901'));
    assert.strictEqual('0 (345) 678 90 12', ttnf('123456789012'));
    assert.strictEqual('0 (456) 789 01 23', ttnf('1234567890123'));
    assert.strictEqual('0 (567) 890 12 34', ttnf('12345678901234'));
    assert.strictEqual('0 (678) 901 23 45', ttnf('123456789012345'));
  });

  it('should format 7-digit numbers', function () {
    assert.strictEqual('444 59 36', ttnf('4445936'));
    assert.strictEqual('444 59 36', ttnf('444 5936'));
    assert.strictEqual('444 59 36', ttnf('44459 36'));
    assert.strictEqual('444 59 36', ttnf('444 59 36'));
  });

  it('should format number type', function () {
    assert.strictEqual('123 45 68', ttnf(1234568));
    assert.strictEqual('0 (212) 123 45 68', ttnf(2121234568));
    assert.strictEqual('0 (212) 123 45 68', ttnf(9002121234568));
  });
});