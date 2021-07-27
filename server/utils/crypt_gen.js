const cryptoRandomString = require('crypto-random-string');

module.exports.gen = function (length) {
    const mChar = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return cryptoRandomString({ length: length, characters: mChar });
}

module.exports.gen_invoice_no = function () {
    const mChar = '0123456789';
    return cryptoRandomString({ length: 20, characters: mChar });
}

module.exports.gen_user_id = function () {
    const mChar = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return cryptoRandomString({ length: 12, characters: mChar });
}
