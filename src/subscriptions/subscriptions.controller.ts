import { Controller, Post, Body, Get, UseGuards, Res } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { EmailService } from '../email/email.service';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(
    private readonly subscriptionsService: SubscriptionsService,
    private readonly emailService: EmailService,
  ) {}

  @Post()
  async subscribe(@Body('email') email: string, @Res() res) {
    const result = await this.subscriptionsService.subscribe(email);
    if ('message' in result && result.message === "This email is already subscribed.") {
      return res.status(409).json(result);
    }
    return res.status(201).json(result);
  }

  @Post('send-bulk')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async sendBulk(@Body() body: { subject: string; message: string }) {
    const subscribers = await this.subscriptionsService.getAll();
    const emails = subscribers.map(s => s.email);
    return this.emailService.sendBulk(emails, body.subject, body.message);
  }

  @Get()
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getAll() {
    return this.subscriptionsService.getAll();
  }
}
