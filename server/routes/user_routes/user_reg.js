const { pool } = require('../../config/postgres_config');
const user = require('./user_model');
const token_handle = require('../../utils/token_handle');
const crypt_gen = require('../../utils/crypt_gen');
const router = require('express').Router();

module.exports = router.post('', async function (req, res) {
    try {
        var body = req.body.user,
            email = body.email.toLowerCase(),
            timestamp = new Date(),
            user_id = crypt_gen.gen_user_id(),
            password = body.password;

        //check and return if email and password does not exist or if null
        if (!email || !password) { return res.status(400).send({ status: false, message: "Null values not allowed!" }); }

        //check if email and password is valid according to user model
        if (!new user(email, password).check_data()) { return res.status(400).send({ status: false, message: "Invalid email or password too short!" }); }

        //generate refresh token for jwt
        var rjwt = await token_handle.gen_rjwt();

        //return if rjwt was not generated successfully
        if (Object.keys(rjwt).length === 0) { return res.send({ status: false, message: "Unexpected error, please try again!" }); }

        //check and return if user already exists in db
        let res00 = await pool.query(`SELECT user_id FROM user_profile WHERE email = $1`, [email]);
        if (res00.rowCount > 0) { return res.status(400).send({ status: false, message: "User already exists!" }); }

        password = await token_handle.hash_password(password);

    } catch (error) {
        console.error(error);
    }

    //create user
    pool.query('INSERT INTO user_profile(user_id, email, password, timestamp, rjwt) VALUES($1, $2, $3, $4, $5)', [user_id, email, password, timestamp, rjwt.hash])
        .then(async function () {
            console.log('user registered successfully!');
            //generate user jwt
            const mjwt = token_handle.gen_jwt({ user_id: user_id, user_type: 0, email_verified: false });
            return res.status(200).send({ status: true, data: { user_id: user_id, jwt: mjwt, rjwt: rjwt.value } });

        })
        .catch(async function (err) {
            console.error(err.stack);
            // if (err.code == '23505') {
            //     return res.status(406).send({ status: false, message: "Email already exists!" });
            // }
            res.status(500).send({ status: false, message: "Internal Server Error" });
        });
});
