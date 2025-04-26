import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.schema';
import { CreateServiceDto } from './dto/create-product.dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async createProduct(createServiceDto: CreateServiceDto): Promise<Product> {
    const createdProduct = new this.productModel(createServiceDto);
    return createdProduct.save();
  }

  async deleteProduct(id: string): Promise<any> {
    return this.productModel.findByIdAndDelete(id);
  }

  async getAllServices(): Promise<any[]> {
    return this.productModel.find().exec();
  }
}
