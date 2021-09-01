const router = require('express').Router();
const gen_invoice_handler = require('../../services/invoice_services/gen_invoice_handler');


// module.exports = async function (app) {
//     //app.post('/api/gen_invoice', function (req, res) {
//    // template_0001.gen();
//     template_0002.gen();
//     template_0003.gen();
//     // })
// }

module.exports = router.get('', async function (req, res) {
    try {
        await gen_invoice_handler(req.body, res);

    } catch (error) {
        console.error(error);
    }
});
