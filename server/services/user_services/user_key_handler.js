const token_handle = require('../../utils/token_handle');
const user_profile_model = require('../../models/user_profile_model');


module.exports.gen_api_key = async function (query, header) {
    let user_id = query.user_id;

    //get jwt token
    let jwt = token_handle.get_auth(header);

    //check jwt
    //if (!await token_handle.chk_jwt(user_id, jwt, res)) { return; }

    //generate api key
    let key = await token_handle.gen_api_key();

    //return if any "key" property is null/undefined 
    if (!key.key_id || !key.key_secret || !key._key_secret) {
        return { status: false, status_code: 500, message: "Error generating keys at this point" }
    }

    //update user data in profile
    let res0 = await user_profile_model.update_api_keys(key.key_id, key._key_secret, user_id);

    //return generated api key data
    if (res0.rowCount > 0) { return { status: true, data: { key_id: key.key_id, key_secret: key.key_secret } } }
}