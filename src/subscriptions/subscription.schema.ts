import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Subscription extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ default: Date.now })
  subscribedAt: Date;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
