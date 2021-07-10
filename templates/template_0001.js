const pdf_doc = require('pdfkit');
const fs = require('fs');
const num_words = require('number-to-words');

module.exports.gen = function () {
    const invoice = new pdf_doc({ size: 'A4' });
    let no = `0000000000000000000000`;
    let invoice_no = `Invoice No#    ${no}`;

    //set invoice details
    let mdate = new Date().toUTCString();
    let invoice_date = `Invoice Date    ${mdate}`;
    let business_name = 'Invoicis Private Limited'
    let business_gstin = 'GSTIN: 29AANCM6721C1ZD';
    let business_pan = 'PAN: AANCM6721C'
    let business_email = 'Email: support@invoicis.com'
    let business_phone = 'Phone: +234-000-00000'
    let business_address = '50 Dike Boulevard, Kingdoms Layout, Agu-Awka';
    let business_district = 'Awka';
    let business_state = 'Anambra';
    let business_country = 'Nigeria';
    let business_postal_code = '420101';
    let client_name = 'Green Farms Limited';
    let client_address = 'Zik Industrial Layout, Ogbommanu'
    let client_district = 'Onitsha'
    let client_state = 'Anambra';
    let client_postal_code = '420108'
    let client_pan = 'AABTB8287B'
    let client_email = 'greenfarmslimited458@gmail.com'
    let client_phone = '+234-000-000001'
    let client_country = 'Nigeria'
    let item_name = 'Invoicis Basic Membership';
    let pay_curr = 'NGN'
    let pay_total = 5000
    let tax = 18;
    let tax_total = parseFloat((tax / 100) * pay_total).toFixed(2);
    let item_amount = pay_total - tax_total;
    let sub_total_words = num_words.toWords(pay_total).toUpperCase();
    let indent_spacing = 0.3;

    //create file stream
    invoice.pipe(fs.createWriteStream('output.pdf'));

    invoice
        .fontSize(20)
        .fillColor('#008080')
        .text('PAYMENT INVOICE', 35, 40)

        .moveDown(0.5)
        .font('Helvetica-Bold')
        .fontSize(8.5)
        .fillColor('#8E9092')
        .text(invoice_no.slice(0, 11), { continued: true })
        .fillColor('black')
        .text(invoice_no.slice(12))

        .moveDown(0.5)
        .font('Helvetica-Bold')
        .fontSize(8.5)
        .fillColor('#8E9092')
        .text(invoice_date.slice(0, 12), { continued: true })
        .fillColor('black')
        .text(invoice_date.slice(13))

        //embed logo
        .image('public/images/logo.png', 480, 20, { width: 100, height: 100 })

        //draw left detail border box
        .lineWidth(8.2)
        .lineJoin('round')
        .rect(30, 140, 260, 135)
        .fillAndStroke('#EFEBF9', '#EFEBF9')

        //draw right detail border box
        .lineWidth(8.2)
        .lineJoin('round')
        .rect(306, 140, 260, 135)
        .fillAndStroke('#EFEBF9', '#EFEBF9')

        //write business details
        .font('Helvetica')
        .fontSize(12)
        .fillColor('#008080')
        .moveDown(3.6)
        .text('Billed By')
        .moveDown(indent_spacing)
        .font('Helvetica-Bold')
        .fontSize(8.5)
        .fillColor('black')
        .text(business_name)
        .moveDown(indent_spacing)
        .font('Helvetica')
        .text(`${business_address},`)
        .moveDown(indent_spacing)
        .text(`${business_district}`)
        .moveDown(indent_spacing)
        .text(`${business_state} - ${business_country} - ${business_postal_code}`)
        .moveDown(indent_spacing)
        .font('Helvetica-Bold')
        .text(business_gstin.slice(0, 6), { continued: true })
        .font('Helvetica')
        .text(business_gstin.slice(6))
        .moveDown(indent_spacing)
        .font('Helvetica-Bold')
        .text(business_pan.slice(0, 4), { continued: true })
        .font('Helvetica')
        .text(business_pan.slice(4))
        .moveDown(indent_spacing)
        .font('Helvetica-Bold')
        .text(business_email.slice(0, 5), { continued: true })
        .font('Helvetica')
        .text(business_email.slice(5))
        .moveDown(indent_spacing)
        .font('Helvetica-Bold')
        .text(business_phone.slice(0, 5), { continued: true })
        .font('Helvetica')
        .text(business_phone.slice(5))

        //write customer details
        .font('Helvetica')
        .fontSize(12)
        .fillColor('#008080')
        .moveDown(3.6)
        .text('Billed To', 311, 148)
        .moveDown(indent_spacing)
        .font('Helvetica-Bold')
        .fontSize(8.5)
        .fillColor('black')
        .text(client_name)
        .moveDown(indent_spacing)
        .font('Helvetica')
        .text(`${client_address},`)
        .moveDown(indent_spacing)
        .text(`${client_district},`)
        .moveDown(indent_spacing)
        .text(`${client_state}, - ${client_country} - ${client_postal_code}`)
        .moveDown(indent_spacing)
        .font('Helvetica-Bold')
        .text('PAN: ', { continued: true })
        .font('Helvetica')
        .text(client_pan)
        .moveDown(indent_spacing)
        .font('Helvetica-Bold')
        .text('Email: ', { continued: true })
        .font('Helvetica')
        .text(client_email)
        .moveDown(0.2)
        .font('Helvetica-Bold')
        .text('Phone: ', { continued: true })
        .font('Helvetica')
        .text(client_phone)

        //draw item details rect box
        .rect(30, 300, 535, 20)
        .fill('#008080')
        .rect(30, 320, 535, 25)
        .fill('#EFEBF9')

        //partition item details rect box
        .lineWidth(1)
        .lineCap('butt')
        .moveTo(60, 300)
        .lineTo(60, 345)
        .moveTo(235, 300)
        .lineTo(235, 345)
        .moveTo(270, 300)
        .lineTo(270, 345)
        .moveTo(335, 300)
        .lineTo(335, 345)
        .moveTo(390, 300)
        .lineTo(390, 345)
        .moveTo(455, 300)
        .lineTo(455, 345)
        .moveTo(500, 300)
        .lineTo(500, 345)
        .stroke()

        //write items detail titles
        .font('Helvetica-Bold')
        .fillColor('white')
        .text(`No.`, 35, 305)
        .text('Item', 135, 305)
        .text('GST', 242, 305)
        .text('Quantity', 285, 305)
        .text(`Rate`, 350, 305)
        .text(`Amount`, 405, 305)
        .text('IGST', 465, 305)
        .text('Total', 525, 305, { lineBreak: false })
        .font('Helvetica')
        .fillColor('black')

        //write item details
        .text(`1.`, 35, 330)
        .text(item_name, 70, 330)
        .text(`%${tax}`, 242, 330)
        .text('1', 300, 330)
        .text(item_amount, 350, 330)
        .text(item_amount, 405, 330)
        .text(tax_total, 465, 330)
        .text(pay_total, 525, 330)

        //write amount totals
        .text(`Total in Words: ${sub_total_words}`, 35, 355)
        .font('Helvetica-Bold')
        .text(`Amount:              `, 460, 355, { continued: true, lineBreak: false })
        .font('Helvetica')
        .text(item_amount, { lineBreak: false })
        .font('Helvetica-Bold')
        .text(`IGST:                    `, 460, 370, { continued: true, lineBreak: false })
        .font('Helvetica')
        .text(tax_total, { lineBreak: false })
        .moveTo(450, 383)
        .lineTo(565, 383)
        .stroke('black')
        .font('Helvetica-Bold')
        .text(`Total ${pay_curr}:         `, 460, 390, { continued: true, lineBreak: false })
        .font('Helvetica')
        .text(parseFloat(pay_total).toFixed(2), { lineBreak: false })

        //write enquiry details
        .font('Helvetica-Bold')
        .text(`For any enquiry, reach out via email ${business_email} or call on ${business_phone}`, 100, 435)
        .text('This is an electronically generated document, no signature is required.', 150, 755)
        .save()


    //close file stream
    invoice.end();
}
