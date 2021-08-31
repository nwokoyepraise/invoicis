const { pool } = require('../../config/postgres_config');
const token_handle = require('../../utils/token_handle');
const router = require('express').Router();
const user_profile_handler = require('../../services/user_services/user_profile_handler');
const base_response = require('../base_response');

module.exports.get_user_profile = router.get('', async function (req, res) {
    try {
        let data = await user_profile_handler.get_user_profile(req.query, req.header('Authorization'));

        base_response.send_response(res, data);

    } catch (error) {
        console.error(error);
    }
});