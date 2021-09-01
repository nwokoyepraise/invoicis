const user_profile_model = require('../../models/user_profile_model');
const token_handle = require('../../utils/token_handle');
const crypt_gen = require('../../utils/crypt_gen');
const user = require('../../models/user_model');

module.exports = async (body) => {
    try {
        var email = body.email?.toLowerCase(),
            timestamp = new Date(),
            user_id = crypt_gen.gen_user_id(),
            password = body.password;
        //check and return if email and password does not exist or if null
        if (!email || !password) { return { status: false, status_code: 400, message: "Null values not allowed!" } }

        //check if email and password is valid according to user model
        if (!new user(email, password).check_data()) { return { status: false, status_code: 400, message: "Invalid email or password too short" } }

        //generate refresh token for jwt
        var rjwt = await token_handle.gen_rjwt();

        //return if rjwt was not generated successfully
        if (Object.keys(rjwt).length === 0) { return { status: false, status_code: 500, message: "Unexpected error, please try again!" } }

        //check and return if user already exists in db
        let res0 = await user_profile_model.get_profile_data(['user_id'], 'email', email)
        if (res0.rowCount > 0) { return { status: false, status_code: 400, message: "User already exists!" } }

        password = await token_handle.hash_password(password);

        //create user
        let res1 = await user_profile_model.create_user(user_id, email, password, timestamp, rjwt.hash)

        if (!res1.rowCount > 0) {return { status: false, status_code: 500, message: "Unable to create user at this point, please try again later" }}

        console.log('user registered successfully!');

        //generate user jwt
        const mjwt = token_handle.gen_jwt({ user_id: user_id, user_type: 0, email_verified: false });
        return { status: true, data: { user_id: user_id, jwt: mjwt, rjwt: rjwt.value } }

    } catch (error) {
        console.error(error);
        if (error?.code == '23505') {
            return { status: false, message: "Email already exists!" }
        }
        return { status: false, message: "Internal Server Error" }
    }
}