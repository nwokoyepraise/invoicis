const cryptoRandomString = require('crypto-random-string');

module.exports.gen_invoice_no = function () {
    const mChar = '0123456789';
    return cryptoRandomString({ length: 20, characters: mChar });
}