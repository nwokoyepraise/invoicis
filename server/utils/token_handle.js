require('dotenv').config();
const argon2 = require('argon2');
const mjwt = require('jsonwebtoken');
const crypt_gen = require('../utils/crypt_gen');
const key = process.env.JWTKEY;


module.exports.gen_rjwt = async function () {
    try {
        let rjwt = {};
        const mrjwt = crypt_gen.gen(12);
        const _mrjwt = await argon2.hash(mrjwt);

        rjwt.value = mrjwt;
        rjwt.hash = _mrjwt;

        return rjwt;
    } catch (error) {
        console.error(error);
    }
}

module.exports.hash_password = async function (password) {
    try {
        return await argon2.hash(password);
    } catch (error) {
        console.error(error);
    }
}

module.exports.chk_jwt = async function (user_id, jwt, res) {
    try {
        var res0 = await mjwt.verify(jwt, key);
        //if (!res0.email_verified) { res.status(406).send({ status: false, message: 'Email not verified!' }); return valid; }
        if (res0.user_id == user_id) {
            return { status: true }
        } else {
            return { status: false, message: 'JWT and user_id mismatch' }
        }

    } catch (error) {
        console.error(error);
        if (error.name == 'TokenExpiredError') {
            return { status: false, message: 'TokenExpiredError' }
        }
        return { status: false, message: 'Not Allowed' }
    }
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

module.exports.gen_api_key = async function () {
    try {
        let key = {};
        key.key_id = crypt_gen.gen(20);
        key.key_secret = crypt_gen.gen(40);
        key._key_secret = await argon2.hash(key.key_secret);
        return key;
    } catch (error) {
        console.error(error);
    }
}