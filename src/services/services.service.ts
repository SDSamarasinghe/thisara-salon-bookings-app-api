import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Services, ServicesDocument } from './services.schema';
import { CreateServiceDto } from './dto/create-product.dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectModel(Services.name) private servicesModel: Model<ServicesDocument>,
  ) {}

  async createService(createServiceDto: CreateServiceDto): Promise<Services> {
    const createdService = new this.servicesModel(createServiceDto);
    return createdService.save();
  }

  async deleteService(id: string): Promise<Services | null> {
    return this.servicesModel.findByIdAndDelete(id);
  }

  async updateService(
    id: string,
    updateDto: Partial<CreateServiceDto>,
  ): Promise<Services | null> {
    return this.servicesModel.findByIdAndUpdate(id, updateDto, { new: true });
  }

  async getAllServices(): Promise<Services[]> {
    return this.servicesModel.find().exec();
  }
}
