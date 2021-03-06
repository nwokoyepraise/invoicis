"use strict"
const pdf_doc = require('pdfkit');
const num_words = require('number-to-words');
const crypt_gen = require('../utils/crypt_gen');

module.exports.gen = function (data, res) {
    const invoice = new pdf_doc({ size: 'A4' });
    let num = crypt_gen.gen_invoice_no();
    let invoice_no = `Invoice No#    ${num}`,

        //set invoice details
        invoice_date = new Date().toUTCString(),
        business_name = data.business_name,
        business_website = data.business_website,
        business_email = data.business_email,
        business_phone = data.business_phone,
        business_address = data.business_address,
        business_district = data.business_district,
        business_state = data.business_state,
        business_country = data.business_country,
        business_postal_code = data.business_postal_code,
        business_accent_color = (data.business_accent_color) ? data.business_accent_color : '#008080',
        client_name = data.client_name,
        client_address = data.client_address,
        client_district = data.client_district,
        client_state = data.client_state,
        client_postal_code = data.client_postal_code,
        client_email = data.client_email,
        client_phone = data.client_phone,
        client_country = data.client_country,
        pay_curr = (data.pay_curr) ? data.pay_curr : 'USD',
        item_desc = data.item_desc,
        indent_spacing = (data.indent_spacing) ? data.indent_spacing : 0.3;

    //create file stream
    invoice.pipe(res);

    invoice
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

        //draw left detail border box
        .lineWidth(8.2)
        .lineJoin('round')
        .rect(30, 120, 220, 17)
        .fill(business_accent_color)

        //draw right detail border box
        .lineWidth(8.2)
        .lineJoin('round')
        .rect(320, 120, 200, 17)
        .fill(business_accent_color)


        //write business details
        .font('Helvetica')
        .fontSize(12)
        .fillColor('white')
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
        .text('Email: ', { continued: true })
        .font('Helvetica')
        .text(business_email)
        .moveDown(indent_spacing)
        .font('Helvetica-Bold')
        .text('Phone: ', { continued: true })
        .font('Helvetica')
        .text(business_phone)
        .moveDown(indent_spacing)
        .font('Helvetica-Bold')
        .text('Website: ', { continued: true })
        .font('Helvetica')
        .text(business_website.slice)

        //write customer details
        .font('Helvetica')
        .fontSize(12)
        .fillColor('white')
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
    let mtax_amounts = [];
    let mitem_amounts = [];
    let max_item_length = (item_desc.length <= 12) ? item_desc.length : 12;
    for (let i = 0; i < max_item_length; i++) {
        let item_name = item_desc[i].item_name,
            item_quantity = (item_desc[i].item_quantity) ? Number(item_desc[i].item_quantity) : 0,
            item_amount = (item_desc[i].item_amount) ? Number(item_desc[i].item_amount) : 0,
            tax = (item_desc[i].tax) ? item_desc[i].tax : 0,
            tax_amount = Math.round((tax / 100) * item_amount * item_quantity),
            pay_total = parseFloat((item_amount * item_quantity) + tax_amount);

        mtax_amounts.push(tax_amount);
        mitem_amounts.push(pay_total);

        let y = (i == 0) ? 277 + 5 : last_y + 17;
        last_y = y;
        invoice.text(i + 1, 35, y)
            .text(item_name, 70, y)
            .text(`${tax}%`, 275, y)
            .text(item_quantity, 310, y)
            .text(item_amount, 355, y)
            .text(item_amount * item_quantity, 410, y)
            .text(tax_amount, 460, y)
            .text(pay_total, 515, y, { lineBreak: false });
    }

    let amount_sum = Number(mitem_amounts.reduce((a, b) => a + b, 0));
    let tax_sum = Number(mtax_amounts.reduce((a, b) => a + b, 0));

    let grand_total_words = num_words.toWords(amount_sum + tax_sum).toUpperCase();

    //write amount totals
    invoice.text(`Total in Words: ${grand_total_words}`, 35, last_y2_bottom + 10)
        .font('Helvetica-Bold')
        .text(`Amount Sum::              `, 440, last_y2_bottom + 10, { continued: true, lineBreak: false })
        .font('Helvetica')
        .text(amount_sum, { lineBreak: false })
        .font('Helvetica-Bold')
        .text(`Tax Sum:                      `, 440, last_y2_bottom + 25, { continued: true, lineBreak: false })
        .font('Helvetica')
        .text(tax_sum, { lineBreak: false })
        .moveTo(435, last_y2_bottom + 35)
        .lineTo(565, last_y2_bottom + 35)
        .stroke('black')
        .font('Helvetica-Bold')
        .text(`Grand Total (${pay_curr}):      `, 440, last_y2_bottom + 40, { continued: true, lineBreak: false })
        .font('Helvetica')
        .text(parseFloat(amount_sum + tax_sum).toFixed(2), { lineBreak: false })

        //write enquiry details
        .font('Helvetica-Bold')
        .text(`For any enquiry, reach out via email ${business_email} or call on ${business_phone}`, 100, last_y2_bottom + 70)
        .text('This is an electronically generated document, no signature is required.', 150, Math.round(invoice.page.maxY()) - 20);
    invoice.save()


    //close file stream
    invoice.end();
}
