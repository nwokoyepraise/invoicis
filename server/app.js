require('dotenv').config();
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const port_number = Number.parseInt(process.env.PORT_NUMBER);

app.use(express.json({ limit: '20kb' }));

const gen_invoice = require('./api/invoice_handler/gen_invoice');
gen_invoice(app);

server.listen(port_number, () => {
    console.log(`server listening on port ${port_number}`);
});
