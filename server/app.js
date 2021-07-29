require('dotenv').config();
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const port_number = Number.parseInt(process.env.PORT_NUMBER);

app.use(express.json({ limit: '20kb' }));

const gen_invoice = require('./api/invoice_handler/gen_invoice');
gen_invoice(app);

const user_reg = require('./api/user_handler/user_reg');
user_reg(app);

const user_auth = require('./api/user_handler/user_auth');
user_auth.user_login(app);

const user_key = require('./api/user_handler/user_key');
user_key.gen_api_key(app)

const user_update = require('./api/user_handler/user_update');
user_update(app);

const user_profile = require('./api/user_handler/user_profile');
user_profile.get_user_profile(app);

server.listen(port_number, () => {
    console.log(`server listening on port ${port_number}`);
});
