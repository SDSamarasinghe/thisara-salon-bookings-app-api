import { Injectable } from '@nestjs/common';
import { EmailService } from '../email/email.service';

@Injectable()
export class ContactService {
  constructor(private readonly emailService: EmailService) {}

  async sendContactEmail(
    name: string,
    email: string,
    phone: string,
    message: string,
  ): Promise<{ success: boolean; error?: string }> {
    const to = 'cleminanderson@gmail.com';
    const subject = 'New Contact Form Submission';
    const html = `
      <h2>New Contact Form Submission</h2>
      <ul>
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Phone:</strong> ${phone}</li>
        <li><strong>Message:</strong> ${message}</li>
      </ul>
    `;
    try {
      await this.emailService.sendWithAttachment(
        to,
        subject,
        html,
        [],
        email, // replyTo
      );
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
