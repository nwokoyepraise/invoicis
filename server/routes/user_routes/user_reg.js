const router = require('express').Router();
const base_response = require('../base_response');
const user_profile_handle = require('../../services/user_services/user_reg_handler');

module.exports = router.post('', async function (req, res) {
    try {
        let body = req.body;

        let data = await user_profile_handle(body);

        base_response.send_response(res, data);

    } catch (error) {
        console.error(error);
    }
});
