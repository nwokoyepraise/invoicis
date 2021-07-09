require('dotenv').config();
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const port_number = Number.parseInt(process.env.PORT_NUMBER);

const gen_invoice = require('./api/gen_invoice');
gen_invoice(app)


server.listen(port_number, () => {
    console.log(`server listening on port ${port_number}`);
});

