import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum BookingStatus {
  Requested = 'Requested',
  Confirmed = 'Confirmed',
  Cancelled = 'Cancelled',
  Rescheduled = 'Rescheduled',
  Completed = 'Completed',
  NoShow = 'No-show',
  InProgress = 'In Progress',
  AwaitingPayment = 'Awaiting Payment',
  Paid = 'Paid',
  Rejected = 'Rejected',
  Refunded = 'Refunded',
  OnHold = 'On Hold',
}

@Schema()
export class Booking extends Document {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true })
  service: string;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  timeSlot: string;

  @Prop()
  specialNotes?: string;

  @Prop({
    type: String,
    enum: Object.values(BookingStatus),
    default: BookingStatus.Requested,
  })
  status: BookingStatus;

}

export const BookingSchema = SchemaFactory.createForClass(Booking);
