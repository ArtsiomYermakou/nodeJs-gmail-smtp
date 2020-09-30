const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

let smtp_login = process.env.SMTP_LOGIN || "---";
let smtp_password = process.env.SMTP_PASSWORD || "---";

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "portfplioermakov@gmail.com",
        pass: "uzatit99",
    },
});

app.get("/", function (req, res) {
    res.send("Hello World");
});

app.post("/sendMessage", async function (req, res) {

    let {name, contacts, message} = req.body;

    let info = await transporter.sendMail({
        from: "HR WANTS ME",
        to: "portfplioermakov@gmail.com",
        subject: "HR WANTS ME",
        html: `<b>Сообщение с Portfolio</b>
            <div>name: ${name}</div>
            <div>contacts: ${contacts}</div>
            <div>message: ${message}</div>`,
    });

    res.send("ok");
})

let port = process.env.PORT || 3010

app.listen(port, function () {
    console.log("Example app listening on port 3010");
})





