const { pool } = require('../../config/postgres_config');
const token_handle = require('../../utils/token_handle');

module.exports.get_user_profile = function (app) {
    app.get('/user_data/get_details/profile', async function (req, res) {
        try {
            let query = req.query,
                user_id = query.user_id,
                header = req.header('Authorization');

            //retrieve user jwt from header
            let jwt = token_handle.get_auth(header);

            //check jwt
            if (!await token_handle.chk_jwt(user_id, jwt, res)) { return; }

            //query profile data
            var res0 = await pool.query('SELECT name, email, phone FROM user_profile WHERE user_id = $1', [user_id]);

            res0.rows[0].email_verified = false;

            if (res0.rowCount > 0) { return res.status(200).send({ status: true, data: res0.rows[0] }); }

            return res.status(200).send({ status: false, message: 'User does not exist!' });
        } catch (error) {
            console.error(error);
            res.status(500).send({ status: false, message: "Internal Server Error" });
        }
    });
}