const functions = require("firebase-functions");
const nodemailer = require('nodemailer');
const express = require('express');
const cors = require('cors');


const app = express();
app.use(cors({ origin: true }));

app.post('/', (req, res) => {
    const { body } = req;
    const isValidMessage = body.message && body.to && body.subject;

    if (!isValidMessage) {
        return res.status(400).send({ message: 'Invalid request' });
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "ejemplo@gmail.com",
            pass: "eeva zmqg iiip ewgk"
        }
    });

    const mailOptions = {
        from: "ejemplo@gmail.com",
        to: body.to,
        subject: body.subject,
        text: body.message
    };

    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            return res.status(500).send({ message: "Error: " + err.message });
        }

        return res.send({ message: "Correo Enviado" });
    });
});

exports.mailer = functions.https.onRequest(app);