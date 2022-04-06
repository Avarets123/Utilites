
//send Nodemailer

const nodeMailer = require('nodemailer');


const send = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: <email>,
        pass: <pass>
    }
});

send.sendMail({
    from: <email>,
    to: <email>,
    subject: 'Head for  Yandex',
    text: 'keys text',
    html: 'Have a nice day'
}, (err, res) => {
    if (err) {
        console.log(err);
    }

    console.log(`Состояние отправки ${res}`);
    send.close();
});
