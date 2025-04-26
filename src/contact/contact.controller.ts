import { Controller, Post, Body } from '@nestjs/common';
import { ContactService } from './contact.service';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  async sendContactMessage(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('phone') phone: string,
    @Body('message') message: string,
  ) {
    return this.contactService.sendContactEmail(name, email, phone, message);
  }
}
