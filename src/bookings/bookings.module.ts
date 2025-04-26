import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { Booking, BookingSchema } from './schemas/booking.schema';

import { EmailModule } from '../email/email.module';
import { EmailService } from '../email/email.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Booking.name, schema: BookingSchema }]),
    EmailModule,
  ],
  controllers: [BookingsController],
  providers: [BookingsService, EmailService],
})
export class BookingsModule {}
