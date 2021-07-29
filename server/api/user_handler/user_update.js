const { pool } = require('../../config/postgres_config');
const token_handle = require('../../utils/token_handle');

module.exports = function (app) {
    app.post('/profile_update/:field', async function (req, res) {
        try {
            let body = req.body.user,
                field = req.params.field,
                user_id = body.user_id,
                jwt = body.jwt;

            //check for empty fields
            if (!user_id || !jwt || !field) { return res.status(400).send({ status: false, message: "Bad Request!" }); }

            //check jwt
            let valid = await token_handle.chk_jwt(user_id, jwt, res);
            if (!valid) { return; }

            let res1;

            //update field of interest accordingly in DB
            switch (field) {
                case 'name':
                    res1 = await pool.query('UPDATE user_profile SET name = $1 WHERE user_id = $2', [body.name, user_id]);
                    break;

                case 'phone':
                    //add workflow for phone validation and updation
                    break;

                default:
                    return res.status(400).send({ status: false, message: "Cannot update invalid field!" });

            }

            //return if record update is successful
            if (res1.rowCount > 0) { return res.status(200).send({ status: true, data: { message: "Success!" } }); }

        } catch (error) {
            console.error(error);
            res.status(500).send({ status: false, message: "Internal Server Error" });
        }

    })
}