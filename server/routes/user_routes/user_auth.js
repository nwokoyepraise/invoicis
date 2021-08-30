const user_auth_handler = require('../../services/user_services.js/user_auth_handler');
const base_response = require('../base_response');
const router = require('express').Router();


module.exports.user_login = router.post('', async (req, res) => {
    try {

        let data = await user_auth_handler.user_login(req.body.user);
        base_response.send_response(res, data)

    } catch (error) {
        console.error(error);
        res.status(500).send({ status: false, message: "Internal Server Error" });
    }
});