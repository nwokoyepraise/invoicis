const router = require('express').Router();
const user_key_handler = require('../../services/user_services/user_key_handler');
const base_response = require('../base_response');

module.exports.gen_api_key = router.get('', async (req, res) => {
    try {
        let data = await user_key_handler.gen_api_key(req.query, req.header('Authorization'));

        base_response.send_response(res, data);
    } catch (error) {
        console.error(error);
    }
});
