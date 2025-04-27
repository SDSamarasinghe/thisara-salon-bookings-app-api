import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Subscription } from './subscription.schema';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectModel(Subscription.name) private subscriptionModel: Model<Subscription>,
  ) {}

  async subscribe(email: string): Promise<Subscription | { message: string }> {
    try {
      // Check if already subscribed
      const existing = await this.subscriptionModel.findOne({ email });
      if (existing) {
        return { message: "This email is already subscribed." };
      }
      const created = new this.subscriptionModel({ email });
      return created.save();
    } catch (error: any) {
      // Fallback: handle duplicate key error from MongoDB
      if (error.code === 11000) {
        return { message: "This email is already subscribed." };
      }
      throw error;
    }
  }

  async getAll(): Promise<Subscription[]> {
    return this.subscriptionModel.find().exec();
  }
}
