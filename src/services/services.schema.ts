import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ServicesDocument = Services & Document;

@Schema()
export class Services {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop()
  description?: string;
}

export const ServicesSchema = SchemaFactory.createForClass(Services);
