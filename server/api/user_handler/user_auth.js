const { pool } = require('../../config/postgres_config');
const argon2 = require('argon2');
const token_handle = require('../../utils/token_handle');
const user = require('./user_model');

module.exports.user_login =  function (app) {
    app.post('/user_login', async (req, res) => {
        try {
            let body = req.body.user,
                email_or_phone = body.email_or_phone.toLowerCase(),
                password = body.password;

            //return if any credential is null
            if (!email_or_phone || !password) { return res.status(400).send({ status: false, message: "Null values not allowed!" }); }

            //check if user key field is email or phone
            let mIdentifier = (email_or_phone.includes('@')) ? 'email' : 'phone';

            //retrieve credential from DB
            let res0 = await pool.query(`SELECT password, user_id, email, rjwt FROM user_profile WHERE ${mIdentifier} = $1`, [email_or_phone]);

            //return if user record is not found
            if (!res0.rowCount > 0) { return res.status(400).send({ status: false, message: "User does not exist!" }); }

            res0 = res0.rows[0];

            //unhash and verify password
            if (!(await argon2.verify(res0.password, password))) { return res.status(406).send({ status: false, message: "Invalid Credentials!" }); }

            //generate new user tokens
            const mrjwt = await token_handle.gen_rjwt();
            const jwt = token_handle.gen_jwt({ user_id: res0.user_id, user_type: 0, email_verified: false });

            //update rjwt field in DB
            let res1 = await pool.query('UPDATE user_profile SET rjwt = $1 WHERE user_id = $2', [mrjwt.hash, res0.user_id]);

            //if successful, return new credentials
            if (res1.rowCount > 0) { return res.status(200).send({ status: true, data: { user_id: res0.user_id, rjwt: mrjwt.value, jwt: jwt, email_verified: false } }); }
        } catch (error) {
            console.error(error);
            res.status(500).send({ status: false, message: "Internal Server Error" });
        }
    });
}