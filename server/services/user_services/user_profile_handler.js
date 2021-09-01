const user_profile_model = require('../../models/user_profile_model');
const token_handle = require('../../utils/token_handle');

module.exports.get_user_profile = async function (query, header) {
    try {
        let user_id = query.user_id;

        //retrieve user jwt from header
        let jwt = token_handle.get_auth(header);

        //check jwt
        let valid = await token_handle.chk_jwt(user_id, jwt);
        if (!valid.status) { return  { status: false, status_code: 406, message: valid.message }}

        //query profile data
        var res0 = await user_profile_model.get_profile_data(['name', 'email', 'phone'], 'user_id', user_id);

        if (res0.rowCount > 0) {
            res0.rows[0].email_verified = false;
            return { status: true, data: res0.rows[0] }
        }

        return { status: false, status_code: 404, message: 'User does not exist!' }
    } catch (error) {
        console.error(error);
        return { status: false, status_code: 500, message: 'Internal Server Error' }
    }

}