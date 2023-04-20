import * as nodemailer from 'nodemailer';
import { EmailOptions } from './emailOptions';
import { Injectable } from '@nestjs/common';

// Mail transport configuration
@Injectable()
export class EmailService {
  async transporter() {
    const {
      smtp: { host, port, secure },
      user,
      pass,
    } = await nodemailer.createTestAccount();
    return nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    });
  }
  async sendEmail(mailOptions: EmailOptions) {
    const transport = await this.transporter();
    // Delivering mail with sendMail method
    transport.sendMail(mailOptions, (error, info) => {
      if (error) console.log(error);
      else console.log('Email sent: ' + info.response);
    });
  }
}
