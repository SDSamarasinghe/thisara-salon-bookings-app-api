import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking, BookingStatus } from './schemas/booking.schema';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<Booking>,
  ) {}

  async createBooking(createBookingDto: CreateBookingDto): Promise<Booking> {
    const createdBooking = new this.bookingModel(createBookingDto);
    return createdBooking.save();
  }

  async getAllBookings(): Promise<Booking[]> {
    return this.bookingModel.find().exec();
  }

  async updateBookingStatus(id: string, status: string): Promise<Booking | null> {
    return this.bookingModel.findByIdAndUpdate(id, { status }, { new: true });
  }
}
