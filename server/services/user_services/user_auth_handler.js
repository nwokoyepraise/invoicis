const user_profile_model = require('../../models/user_profile_model');
const argon2 = require('argon2');
const token_handle = require('../../utils/token_handle');

module.exports.user_login = async function (user) {
    try {
        let email_or_phone = user.email_or_phone?.toLowerCase(),
            password = user.password;

        //return if any credential is null
        if (!email_or_phone || !password) { return { status: false, status_code: 400, message: "Null values not allowed!" } }

        //check if user key field is email or phone
        let mIdentifier = (email_or_phone.includes('@')) ? 'email' : 'phone';

        //retrieve credential from DB
        let res0 = await user_profile_model.get_profile_data(['password', 'user_id', 'email', 'rjwt'], mIdentifier, email_or_phone);

        //return if user record is not found
        if (!res0.rowCount > 0) { return { status: false, status_code: 404, message: "User does not exist!" } }

        res0 = res0.rows[0];

        //unhash and verify password
        if (!(await argon2.verify(res0.password, password))) { return { status: false, status_code: 406, message: "Invalid Credentials!" } }

        //generate new user tokens
        const mrjwt = await token_handle.gen_rjwt();
        const jwt = token_handle.gen_jwt({ user_id: res0.user_id, user_type: 0, email_verified: false });

        let res1 = await user_profile_model.update_profile_data(['rjwt'], [mrjwt.hash], 'user_id', res0.user_id)

        //if successful, return new credentials
        if (res1.rowCount > 0) { return { status: true, data: { user_id: res0.user_id, rjwt: mrjwt.value, jwt: jwt, email_verified: false } } }
    } catch (error) {
        console.log(error);

    }
}