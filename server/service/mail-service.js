const nodemailer = require("nodemailer");
require("dotenv");

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      debug: true,
      tls: {
        ciphers: "SSLv3",
        rejectUnauthorized: false,
      },
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendActivatioMail(to, link) {
    await this.transporter.sendMail({
      from: "aleksej.7777@web.de",
      to,
      subject: "Aktivierung des Accounts auf " + process.env.API_URL,
      text: "",
      html: `
      <div>
        <h1>Folgen Sie bitte diesem Link, um Ihr Account zu aktivieren:</h1>
        <a href="${link}">${link}</a>
      </div>      
      `,
    });
  }
}

module.exports = new MailService();
