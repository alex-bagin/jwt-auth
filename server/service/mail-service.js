const nodemailer = require("nodemailer");
const keys = require("../keys/index");

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: keys.SMTP_HOST,
      port: keys.SMTP_PORT,
      secure: true,
      debug: true,
      tls: {
        ciphers: "SSLv3",
        rejectUnauthorized: false,
      },
      auth: {
        user: keys.SMTP_USER,
        pass: keys.SMTP_PASSWORD,
      },
    });
  }

  async sendActivatioMail(to, link) {
    await this.transporter.sendMail({
      from: keys.SMTP_USER,
      to,
      subject: "Aktivierung des Accounts auf " + keys.API_URL,
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
