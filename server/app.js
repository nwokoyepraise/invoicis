require('dotenv').config();
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const port_number = Number.parseInt(process.env.PORT_NUMBER);
const gen_invoice = require('./routes/invoice_routes/gen_invoice');
const user_reg = require('./routes/user_routes/user_reg');
const user_auth = require('./routes/user_routes/user_auth');
const user_key = require('./routes/user_routes/user_key');
const user_update = require('./routes/user_routes/user_update');
const user_profile = require('./routes/user_routes/user_profile');


app.use(express.json({ limit: '20kb' }));

//load routes
app.use('/user_reg', user_reg);
app.use('/user_login', user_auth.user_login);
app.use('/profile_update', user_update.profile_update);
app.use('/user_data/get_details/profile', user_profile.get_user_profile);
app.use('/api/gen_invoice', gen_invoice);
app.use('/api/gen_key', user_key.gen_api_key);


server.listen(port_number, () => {
    console.log(`server listening on port ${port_number}`);
});
