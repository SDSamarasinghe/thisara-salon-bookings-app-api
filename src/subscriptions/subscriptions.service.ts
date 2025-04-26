import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Subscription } from './subscription.schema';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectModel(Subscription.name) private subscriptionModel: Model<Subscription>,
  ) {}

  async subscribe(email: string): Promise<Subscription> {
    const created = new this.subscriptionModel({ email });
    return created.save();
  }

  async getAll(): Promise<Subscription[]> {
    return this.subscriptionModel.find().exec();
  }
}
