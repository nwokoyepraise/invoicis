const template_0001 = require('../../templates/template_0001');
const template_0002 = require('../../templates/template_0002');
const template_0003 = require('../../templates/template_0003');
const null_undefined_checker = require('../../utils/null_undefined_checker');

// module.exports = async function (app) {
//     //app.post('/api/gen_invoice', function (req, res) {
//    // template_0001.gen();
//     template_0002.gen();
//     template_0003.gen();
//     // })
// }

module.exports = async function (app) {
    app.post('/api/gen_invoice', function (req, res) {
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

        let obj = {
            template_id: template_id, business_name: business_name, business_website: business_website, business_email: business_email,
            business_phone, business_phone, business_address: business_address, business_district: business_district, business_state: business_state,
            business_country: business_country, business_postal_code: business_postal_code, business_accent_color: business_accent_color,
            client_name: client_name, client_address: client_address, client_district: client_district, client_state: client_state,
            client_postal_code, client_postal_code, client_email, client_phone, client_country: client_country,  item_desc: item_desc, indent_spacing: indent_spacing
        }


        // if (!is_valid[0]) { return res.status(400).send({ status: false, message: `'${valid[1]}' field cannot be null!` });}

        switch (template_id) {
            case 'template_0001':
                template_0001.gen(obj);
                break;

            case '':

                break;

            case '':

                break;
        }
        } catch (error) {
            console.error(error);
        }
    });
}