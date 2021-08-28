const template_0001 = require('../../templates/template_0001');
const template_0002 = require('../../templates/template_0002');
const template_0003 = require('../../templates/template_0003');
const router = require('express').Router();

// module.exports = async function (app) {
//     //app.post('/api/gen_invoice', function (req, res) {
//    // template_0001.gen();
//     template_0002.gen();
//     template_0003.gen();
//     // })
// }

module.exports = router.get('', async function (req, res) {
    try {
        let body = req.body,
            template_id = body.template_id,
            business_name = body.business_name,
            business_website = body.business_website,
            business_email = body.business_email,
            business_phone = body.business_phone,
            business_address = body.business_address,
            business_district = body.business_district,
            business_state = body.business_state,
            business_country = body.business_country,
            business_postal_code = body.business_postal_code,
            business_accent_color = body.business_accent_color,
            client_name = body.client_name,
            client_address = body.client_address,
            client_district = body.client_district,
            client_state = body.client_state,
            client_postal_code = body.client_postal_code,
            client_email = body.client_email,
            client_phone = body.client_phone,
            client_country = body.client_country,
            item_desc = body.item_desc,
            indent_spacing = body.indent_spacing;

        //create object
        let obj = {
            template_id: template_id, business_name: business_name, business_website: business_website, business_email: business_email,
            business_phone, business_phone, business_address: business_address, business_district: business_district, business_state: business_state,
            business_country: business_country, business_postal_code: business_postal_code, business_accent_color: business_accent_color,
            client_name: client_name, client_address: client_address, client_district: client_district, client_state: client_state,
            client_postal_code, client_postal_code, client_email, client_phone, client_country: client_country, item_desc: item_desc, indent_spacing: indent_spacing
        }

        switch (template_id) {
            case 'template_0001':
                await template_0001.gen(obj, res);
                break;

            case 'template_0002':
                await template_0002.gen(obj, res);
                break;

            case 'template_0003':
                await template_0003.gen(obj, res);
                break;

        }
    } catch (error) {
        console.error(error);
        res.status(200).send({ status: false, message: 'Unexpected error, please try again!' })
    }
});
