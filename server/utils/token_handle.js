require('dotenv').config();
const argon2 = require('argon2');
const mjwt = require('jsonwebtoken');
const { pool } = require('../config/postgres_config');
const crypt_gen = require('../utils/crypt_gen');
const key = process.env.JWTKEY;


module.exports.gen_rjwt = async function () {
    let rjwt = {};
    try {
        const mrjwt = crypt_gen.gen(12);
        const _mrjwt = await argon2.hash(mrjwt);

        rjwt.value = mrjwt;
        rjwt.hash = _mrjwt;

    } catch (error) {
        console.error(error);
    }
    return rjwt;
}

module.exports.hash_password = async function (password) {
    try {
        password = await argon2.hash(password);

    } catch (error) {
        console.error(error);
    }
    return password;
}

module.exports.chk_jwt = async function (user_id, jwt, res) {
    var valid = false;

    try {
        var res0 = await mjwt.verify(jwt, key);
        if (!res0.email_verified){res.status(406).send({ status: false, message: 'Email not verified!' }); return valid;}
        if (res0.user_id == user_id) {
            valid = true;
        } else {
            throw new Error('JWT and user_id mismatch!');
        }
    } catch (error) {
        console.error(error);
        if (error.name == 'TokenExpiredError') {
            res.status(406).send({ status: false, message: 'TokenExpiredError' }); return valid;
        } else { console.log(error); res.status(406).send({ status: false, message: 'Not Allowed' }); return valid; }
    }
    return valid;
}

module.exports.gen_jwt = function (user) {
    return mjwt.sign(user, key, { expiresIn: '86400s' });
}

module.exports.get_auth = function (authHeader) {
    let auth;
    if (!authHeader) { return '' }
    auth = authHeader.split(' ')[1];
    return auth;
}
