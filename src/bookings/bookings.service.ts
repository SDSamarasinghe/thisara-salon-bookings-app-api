import { Injectable } from '@nestjs/common';
import { EmailService } from '../email/email.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking, BookingStatus } from './schemas/booking.schema';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<Booking>,
    private readonly emailService: EmailService,
  ) {}

  async createBooking(createBookingDto: CreateBookingDto): Promise<Booking> {
    const createdBooking = new this.bookingModel(createBookingDto);
    const savedBooking = await createdBooking.save();

    // Send confirmation email
    const subject = 'Booking Confirmation';
    const message = `
      <h2>Thank you for your booking, ${savedBooking.fullName}!</h2>
      <p>Your booking details are as follows:</p>
      <ul>
        <li><strong>Service:</strong> ${savedBooking.service}</li>
        <li><strong>Date:</strong> ${savedBooking.date}</li>
        <li><strong>Time:</strong> ${savedBooking.timeSlot}</li>
        <li><strong>Status:</strong> ${savedBooking.status}</li>
      </ul>
      <p>If you have any questions, feel free to reply to this email.</p>
    `;
    try {
      await this.emailService.send(savedBooking.email, subject, message);
    } catch (error) {
      // Optionally log or handle email errors
      console.error('Failed to send booking confirmation email:', error);
    }

    return savedBooking;
  }

  async getAllBookings(): Promise<Booking[]> {
    return this.bookingModel.find().exec();
  }

  async updateBookingStatus(
    id: string,
    status: string,
  ): Promise<Booking | null> {
    // Update the booking status
    const updatedBooking = await this.bookingModel.findByIdAndUpdate(id, { status }, { new: true });

    // If booking updated, send notification email
    if (updatedBooking) {
      const subject = 'Booking Status Updated';
      const message = `
        <h2>Hello ${updatedBooking.fullName},</h2>
        <p>Your booking status has been updated.</p>
        <ul>
          <li><strong>Service:</strong> ${updatedBooking.service}</li>
          <li><strong>Date:</strong> ${updatedBooking.date}</li>
          <li><strong>Time:</strong> ${updatedBooking.timeSlot}</li>
          <li><strong>New Status:</strong> ${updatedBooking.status}</li>
        </ul>
        <p>If you have any questions, please contact us.</p>
      `;
      try {
        await this.emailService.send(updatedBooking.email, subject, message);
      } catch (error) {
        console.error('Failed to send booking status update email:', error);
      }
    }
    return updatedBooking;
  }
}
