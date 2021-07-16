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
    let business_accent_color = '#008080';
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
    invoice.pipe(fs.createWriteStream('output3.pdf'));

    invoice
        .rect(30, 5, 535, 10)
        .fill(business_accent_color)
        //embed logo
        .image('public/images/logo.png', 35, 30, { width: 35, height: 35 })

        //write doc title
        .fontSize(30)
        .fillColor('black')
        .text('PAYMENT INVOICE', 80, 40)

        //write invoice creation details
        .font('Helvetica-Bold')
        .fontSize(8.5)
        .fillColor('#8E9092')
        .text(invoice_no.slice(0, 11), 35, 80, { continued: true })
        .fillColor('black')
        .text(invoice_no.slice(12))

        .moveDown(0.2)
        .font('Helvetica-Bold')
        .fontSize(8.5)
        .fillColor('#8E9092')
        .text(invoice_date.slice(0, 12), { continued: true })
        .fillColor('black')
        .text(invoice_date.slice(13))

        //draw underlinings
        .lineWidth(0.5)
        .moveTo(35, 136)
        .lineTo(250, 136)
        .stroke('black')

        .lineWidth(0.5)
        .moveTo(325, 136)
        .lineTo(540, 136)
        .stroke('black')

        //write business details
        .font('Helvetica')
        .fontSize(12)
        .fillColor('black')
        .text('BILLED BY', 35, 124)
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
        .fillColor('black')
        .moveDown(3.6)
        .text('BILLED TO', 325, 124)
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

        .rect(30, 260, 535, 17)
        .fill(business_accent_color);


    //draw item rects
    let last_y2;
    for (let i = 0; i < 6; i++) {
        let y1 = (i == 0) ? 277 : last_y2 + 17;
        let y2 = y1 + 17;
        last_y2 = y2;
        invoice.rect(30, y1, 535, 17)
            .fill('white')
            .rect(30, y2, 535, 17)
            .fill('#EFEBF9');
    }

    //partition item details rect boxh
    let last_y2_bottom = last_y2 + 17;
    invoice.lineWidth(1)
        .lineCap('butt')
        .moveTo(60, 260)
        .lineTo(60, last_y2_bottom)
        .moveTo(270, 260)
        .lineTo(270, last_y2_bottom)
        .moveTo(300, 260)
        .lineTo(300, last_y2_bottom)
        .moveTo(340, 260)
        .lineTo(340, last_y2_bottom)
        .moveTo(400, 260)
        .lineTo(400, last_y2_bottom)
        .moveTo(450, 260)
        .lineTo(450, last_y2_bottom)
        .moveTo(500, 260)
        .lineTo(500, last_y2_bottom)
        .stroke()

        //write items detail titles
        .font('Helvetica-Bold')
        .fillColor('white')
        .text(`No.`, 35, 265)
        .text('Item', 135, 265)
        .text('Tax', 275, 265)
        .text('Quantity', 302, 265)
        .text(`Rate`, 360, 265)
        .text(`Amount`, 407, 265)
        .text('Tax Sum', 455, 265)
        .text('Total', 525, 265, { lineBreak: false })
        .font('Helvetica')
        .fillColor('black');

    //write item details
    let last_y;
    for (let i = 0; i < 1; i++) {

        let y = (i == 0) ? 277 + 5 : last_y + 17;
        last_y = y;
        invoice.text(`1.`, 35, y)
            .text(item_name, 70, y)
            .text(`%${tax}`, 275, y)
            .text('1', 310, y)
            .text(item_amount, 355, y)
            .text(item_amount, 410, y)
            .text(tax_total, 455, y)
            .text(pay_total, 515, y, { lineBreak: false });
    }

    //write amount totals
    invoice.text(`Total in Words: ${sub_total_words}`, 35, last_y2_bottom + 10)
        .font('Helvetica-Bold')
        .text(`SubTotal:              `, 460, last_y2_bottom + 10, { continued: true, lineBreak: false })
        .font('Helvetica')
        .text(item_amount, { lineBreak: false })
        .font('Helvetica-Bold')
        .text(`Tax:                    `, 460, last_y2_bottom + 25, { continued: true, lineBreak: false })
        .font('Helvetica')
        .text(tax_total, { lineBreak: false })
        .stroke('black')
        .font('Helvetica-Bold')
        .rect(460, last_y2_bottom + 35, 100, 15)
        .fill(business_accent_color)
        .moveTo(450, last_y2_bottom + 35)
        .lineTo(565, last_y2_bottom + 35)
        .moveTo(450, last_y2_bottom + 50)
        .lineTo(565, last_y2_bottom + 50)
        .stroke('black')
        .fill('black')
        .text(`Total (${pay_curr}):      `, 460, last_y2_bottom + 40, { continued: true, lineBreak: false })
        .font('Helvetica')
        .text(parseFloat(pay_total).toFixed(2), { lineBreak: false })

        //write enquiry details
        .font('Helvetica-Bold')
        .text(`For any enquiry, reach out via email ${business_email} or call on ${business_phone}`, 100, last_y2_bottom + 70)
        .text('This is an electronically generated document, no signature is required.', 150, Math.round(invoice.page.maxY()) - 20)

        .rect(30, Math.round(invoice.page.height - 15), 535, 10)
        .fill(business_accent_color);
    invoice.save()


    //close file stream
    invoice.end();
}