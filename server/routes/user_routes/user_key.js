const { pool } = require('../../config/postgres_config');
const token_handle = require('../../utils/token_handle');
const router = require('express').Router();

module.exports.gen_api_key = router.get('', async (req, res) => {
    try {
        let query = req.query,
            user_id = query.user_id,
            header = req.header('Authorization');

        //get jwt token
        let jwt = token_handle.get_auth(header);

        //check jwt
        if (!await token_handle.chk_jwt(user_id, jwt, res)) { return; }

        //generate api key
        let key = await token_handle.gen_api_key();

        //return if any "key" property is null/undefined 
        if (!key.key_id || !key.key_secret || !key._key_secret) {
            return res.status(500).send({ status: false, message: "Error generating keys at this point!" });
        }

        //update user data in profile
        let res0 = await pool.query('UPDATE user_profile SET (api_key_id, api_key_secret) = ($1, $2) WHERE user_id = $3',
            [key.key_id, key._key_secret, user_id]);

        //return generated api key data
        if (res0.rowCount > 0) { return res.status(200).send({ status: true, data: { key_id: key.key_id, key_secret: key.key_secret } }) }

    } catch (error) {
        console.error(error);
        res.status(500).send({ status: false, message: "Internal Server Error" });
    }
});
