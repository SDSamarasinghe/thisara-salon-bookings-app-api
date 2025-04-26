import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  async sendBulk(emails: string[], subject: string, message: string): Promise<any> {
    const sendPromises = emails.map((email) =>
      this.transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: email,
        subject,
        html: message,
      })
    );
    return Promise.all(sendPromises);
  }

  async send(email: string, subject: string, message: string): Promise<any> {
    return this.transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: email,
      subject,
      html: message,
    });
  }

  async sendWithAttachment(email: string, subject: string, message: string, attachments: Array<{filename: string, path: string}>, replyToAddress?: string): Promise<any> {
    return this.transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: email,
      subject,
      html: message,
      attachments,
      replyTo: replyToAddress || undefined,
    });
  }

  async sendWithTemplate(email: string, subject: string, template: string, context: Record<string, any>): Promise<any> {
    // Simple template replacement using {{key}} in template
    let html = template;
    for (const key in context) {
      html = html.replace(new RegExp(`{{\\s*${key}\\s*}}`, 'g'), context[key]);
    }
    return this.transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: email,
      subject,
      html,
    });
  }
}
